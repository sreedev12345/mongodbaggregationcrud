const express = require('express');
const router = express.Router();
const { insertComment,getComment,updateComment } = require('../repository/comment.js')
const  { config } = require('../repository/config.js');
const { sendResponse } = require('../repository/user.js')
const comment = require('../models/comment');
const mongoose = require('mongoose')

router.get('/addcomment',async(req,res)=>{
	let userid = '5fb4b5726dda744511a84c91';
	const comment = 'goode';
	const query = {
		userid : userid,
		comments : {
			userid : userid,
			comment : comment
		}
	}
	const find = await insertComment('comment',query);
	const save = await sendResponse(req,res,config.status.success,config.usersuccess.useraddmessage,find);
       return save;
})

router.get('/getcomment',async(req,res)=>{
	const data = [];
	data.push(
		{
			$match : {
				'_id' : mongoose.Types.ObjectId('5fb4cf7ed8943762bfb7f6e8')
			}
		},{
			$project : {
				comments : 1,
				userid : 1
			}
		},{
			$unwind : '$comments'
		},{
			$group : {
				_id : '$_id',
				comments : {
					$push : '$comments.comment'
				},
				userid : {
					$first : '$comments.userid'
				},commentid : {
					$push : '$comments.userid'
				}
			}
		}	
	)
	const find = await comment.aggregate(data);
	console.log(find)
	res.json({
		data : find
	})
})

router.get('/updatecomment',async(req,res)=>{
	let userid = '5fb4d8c023e984678536df8c';
	const comment = 'marvelous';
	const query = {
		_id : '5fb4cf7ed8943762bfb7f6e8'
	}
	const update = {
		$push : {
			comments : {
				userid : userid,
				comment : comment
			},
		}
	};
	const updaterecord = await updateComment('comment',query,update);
     res.json({
     	data : updaterecord
     })
})

router.get('/editcomment',async(req,res)=>{
	const query = {
		_id : '5fb4cf7ed8943762bfb7f6e8',
		'comments.comment':'nice',
		comments : {
			$elemMatch : {
				userid : '5fb4d8c023e984678536df8c'
			}
		}
	}
	const update = {
		$set : {
			'comments.$.comment' : 'nice!!!!!!!!!!!!!!!!!!!!!!!!!!'
		}
	}
	const find = await comment.update(query,update);
	// const find = await comment.find()
	res.json({
		data : find
	})
})

router.get('/removecomments',async(req,res)=>{
	const query = {
		_id : '5fb4cf7ed8943762bfb7f6e8',
		'comments.userid' : '5fb4d8c023e984678536df8c'
	};

	const update = {
		$pull : {
			'comments' : {
				comment : 'marvelous'
			}
		}
	}
	const dele = await comment.update(query,update);
	//const dele = await comment.find()
	res.json({
		data : dele
	})
})

module.exports = router;