const express = require('express');
const router = express.Router();
const { getDocumentById,sendResponse} = require('../repository/user.js');
const { insertHobby,getHobby } = require('../repository/hobby.js');
const  { config } = require('../repository/config.js');
const user = require('../models/user.js');
const hobby = require('../models/hobby.js')


router.get('/addhobby',async(req,res)=>{
	const userid = '5fb4b5726dda744511a84c91';
	const hobbies = 'coding';
	const query = {
		_id : userid
	}
	const insert = {
		userid : userid,
		hobbies : hobbies
	}
	const finduser = await getDocumentById('user',query);
	if(finduser.length>=1) {
		const recordsave = await insertHobby('hobby',insert).catch((error)=>{
			const send = sendResponse(req,res,config.status.dberrorstatus,config.errmsg.dberror,error);
				return send;
		})
        if(recordsave) {
        	const save = await sendResponse(req,res,config.status.success,config.usersuccess.useraddmessage,recordsave);
        	return save;
        } else {
        	const save = await sendResponse(req,res,config.status.internalserver,config.errmsg.saveerr,null);
        	return save;
        }
	} else {
		const save = await sendResponse(req,res,config.status.notfound,config.errmsg.norecordfound,null);
        return save;
	}
})

router.get('/gethobby',async(req,res)=>{
	const findhobby = await getHobby('hobby').catch((error)=>{
		const send = sendResponse(req,res,config.status.dberrorstatus,config.errmsg.dberror,error);
		return send;
	})
	if(findhobby) {
		const data = [
			{
				$lookup : {
					from :'users',
					localField : 'userid',
					foreignField: '_id',
					as : 'records'
				}
			},{
				$project : {
					hobbies : 1,
					records: 1,
					userid : 1,
					records : 1
				}
			},{
				$unwind : '$hobbies'
			},{
				$project : {
					hobbies : 1,
					userid : 1,
					records : 1
				}
			},{
				$unwind : '$records'
			},{
				$project : {
					hobbies :1,
					records : 1,
					userid :1
				}
			},{
				$group : {
					_id : '$records._id',
					username : {
						$first : '$records.username'
					},
					email : {
						$first : '$records.email'
					},
					hobbies : {
						$push : '$hobbies'
					},
					userid : {
						$first : '$userid'
					},
					hobbyid : {
						$first : '$_id'
					}
				}
			}
		]
		const findrecord = await hobby.aggregate(data)
		console.log(findrecord)
		res.json({
			data : findrecord
		})
	}
})

router.get('/gethobby1',async(req,res)=>{
	const data = [];
	const userid = '5fb4b770fbe24347f0d8bb45'
	data.push(
		{
			$lookup : {
				from : 'hobbies',
				localField : '_id',
				foreignField : 'userid',
				as : 'data'
			}
		},{
			$project : {
				username :1,
				email : 1,
				status : 1,
				data : 1
			}
		},{
			$unwind : '$data'
		},{
			$project : {
				username : 1,
				email : 1,
				status : 1,
				data :1
			}
		},{
			$unwind : '$data.hobbies'
		},{
			$group : {
				_id : '$data._id',
				hobbies : {
					$push : '$data.hobbies'
				},
				userid : {
					$first : '$data.userid'
				},
				username : {
					$first : '$username'
				},
				email : {
					$first : '$email'
				},
				status : {
					$first : '$status'
				}
			}
		}
	)
	const find = await user.aggregate(data);
	res.json({
		data : find
	})
})

router.get('/hobbyaggre',async(req,res)=>{
	const data = [];
	data.push({
		$match : {
			hobbies: {$in:['coding']}
		}
	},{
		$project : {
			userid : 1,
			hobbies : 1
		},
	})
	const find = await hobby.aggregate(data);
	console.log(find)
	res.json({
		data : find
	})
})

module.exports = router;