const express = require('express');
const router = express.Router();
const { getOneDocument,
	getAllDocument,
	passwordHash,insertDocument,verifyPassword,
	sendResponse,updateDocument,authentication,getDocumentById,removeDocument} = require('../repository/user.js');
const  { config } = require('../repository/config.js');

const user = require('../models/user.js')

router.get('/adduser',async(req,res)=>{
	let username = 'sreejith';
	let password = 'sreedev';
	let email = 'sreejith@gmail.com';
	let status = 1;
	const query = {
		email : email
	};
	const find = await getOneDocument('user',query);
	if(find == null) {
		const pwd = await passwordHash(password);
		if(!pwd) {
			return await sendResponse(req,res,config.status.internalserverhasherr,config.errmsg.hasherr,null);
		} else {
			const insert = {
				username : username,
				password : pwd,
				email : email,
				status : status
			};
			console.log(insert)
			const save = await insertDocument('user',insert).catch((error)=>{
				console.log(error)
				const send = sendResponse(req,res,config.errmsg.dberror,config.errmsg.dberror,error);
				return send;
			})
			if(save) {
				const success = sendResponse(req,res,config.status.success,config.usersuccess.useraddmessage,save);
				return success;
			} else {
				res.json({
					data : 'cant'
				})
			}
		}	
	} else {
		const found = await sendResponse(req,res,config.errmsg.alreadypresent,find.email);
		return found;
	}
})

router.get('/getuser',async(req,res)=>{
	const get = await getAllDocument('user').catch((error)=>{
		const getdata = sendResponse(req,res,config.status.internalserver,config.errmsg.dberror,error);
		return getdata;
	});
	if(get.length<=0) {
		const result  = await sendResponse(req,res,config.status.notfound,config.errmsg.notfound,get);
		return result;
	} else {
		const getdata = sendResponse(req,res,config.status.success,config.usersuccess.usergetmessage,get);
		return getdata;
	}
})

router.get('/updateuser',async(req,res)=>{
	let username = 'sreedev';
	let password = 'sreedev';
	let email = 'sreedev@gmail.com';
	let status = 1;
	const query = {
		email : email
	};
    let update = {
    	email : 'sreedev@gmail.com'
    };
    const find = await getOneDocument('user',query);
    if(find === null) {
    	const getdata = sendResponse(req,res,config.status.notfound,config.errmsg.notfound,find);
    	return getdata;
    } else {
    	query._id = find._id;
    	const pwdcheck = await verifyPassword(password,find.password);
    	if(pwdcheck === true) {
    		const updateone = await updateDocument('user',query,update).catch((error)=>{
    			const send = sendResponse(req,res,config.status.internalserver,config.errmsg.dberror,error);
    			return send;
    		});
    		if(updateone.n>=1) {
    			const getdata = sendResponse(req,res,config.status.success,config.updatesuccess.updatemsg,updateone);
    			return getdata;
    		} else {
    			const error = sendResponse(req,res,config.status.internalserver,config.updatesuccess.errmsg,null);
    			return error;
    		}
    	} else {
    		const error = sendResponse(req,res,config.status.notfound,config.errmsg.passworderror,null);
    		return error;
    	}
    }
})

router.get('/login',async(req,res)=>{
	let username = 'sreedev';
	let password = 'sreedev';
	let email = 'sreedev@gmail.com';
	const query = {
		$or : [{
			username : username
		},{
			email : email
		}]
	};
	const find = await getOneDocument('user',query);
	if(find === null) {
		const error = sendResponse(req,res,config.errmsg.usererror,null);
    	return error
	} else {
		const pwdcheck = await verifyPassword(password,find.password);
		if(pwdcheck === true) {
			const tokengenerate = await authentication(find._id);
			if(tokengenerate) {
				const update = {
					authtoken : tokengenerate
				}
				const updateone = await updateDocument('user',query,update).catch((error)=>{
					const send = sendResponse(req,res,config.status.internalserver,config.errmsg.dberror,error);
					return sent;
				})
				if(updateone) {
					const data = {
					authtoken : tokengenerate,
					username : find.username
				}
				const sent = sendResponse(req,res,config.status.success,config.authentication.response,data);
				return sent;
			} else {
				const error = sendResponse(req,res,config.status.internalserver,config.errmsg.updateerror,null);
				return error;
			}
			} else {
				const sent = sendResponse(req,res,config.status.internalserver,config.errmsg.autherror,data);
				return sent;
			}
		} else {
			const error = sendResponse(req,res,config.status.notfound,config.errmsg.passworderror,null);
    		return error;
		}
	}
})

router.get('/remove',async(req,res)=>{
	let _id = ['5fb49f41a1daa42fc56fa272','5fb4a12c13f11c31c2bad3fe'];
	const query = {
		_id : _id
	}
	let find = await getDocumentById('user',query).catch((error)=>{
		const send = sendResponse(req,res,config.status.internalserver,config.errmsg.dberror,error);
    		return send;
	});
	if(find.length>=1) {
		const remove = await removeDocument('user',query).catch((error)=>{
			const errdata = sendResponse(req,res,config.status.internalserver,config.errmsg.usererror,error);
    		return errdata;
		})
		if(remove) {
			const errdata = sendResponse(req,res,config.status.success,config.errmsg.removemsg,remove);
    		return errdata;
		} else {
			const errdata = sendResponse(req,res,config.status.notfound,config.errmsg.cantremove,remove);
    		return errdata;
		}
	} else {
		const errdata = sendResponse(req,res,config.status.notfound,config.errmsg.norecordfound,null);
    		return errdata;
	}
})





module.exports = router;