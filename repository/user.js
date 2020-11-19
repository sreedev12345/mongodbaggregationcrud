const db = {
	user : require('../models/user')
}

const saltround = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = 'xxxxxxxxxxxxxxxxxx';

const obj = {};

module.exports.getOneDocument = async(model,query)=>{
	const data = db[model];
	const find = await data.findOne(query);
	return find;
}

module.exports.authentication = async(data)=>{
	const obj = {
		data:data
	}
	const generate = await jwt.sign(obj,secretkey);
	return generate;
}

module.exports.getAllDocument = async(model)=>{
	const data = db[model];
	const find = await data.find();
	return find;
}

module.exports.getDocumentById = async(model,query)=>{
	const data = db[model];
	const find = await data.find(query);
	return find
}

module.exports.removeDocument = async(model,query)=>{
	const data = db[model];
	const records = await data.remove(query);
	return records;
}

module.exports.updateDocument = async(model,query,update)=>{
	const data = db[model];
	const updateone = await data.update(query,update);
	return updateone;
}


module.exports.sendResponse = (req,res,status,msg,data)=>{
	obj.status = status;
	obj.message=msg;
	obj.data = data;
	res.json({
		data : obj
	})
}

module.exports.insertDocument = async(model,query)=>{
	console.log(query)
	const data = db[model](query);
	const insert = await data.save();
	return insert;
}

module.exports.passwordHash = async(password)=>{
	const pwd = await bcrypt.hash(password,saltround);
	return pwd;
}

module.exports.verifyPassword = async(password,dbpassword)=>{
	const check = await bcrypt.compare(password,dbpassword);
	return check;
}