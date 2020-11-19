const db = {
	comment : require('../models/comment')
}

module.exports.insertComment = async(model,query)=>{
	const data = db[model](query);
	return data.save();
}

module.exports.getComment = async(model)=>{
	const data = db[model];
	const record = await data.find();
	return record;
}

module.exports.updateComment = async(model,query,update)=>{
	const data = db[model];
	const record = await data.update(query,update);
	return record;
}