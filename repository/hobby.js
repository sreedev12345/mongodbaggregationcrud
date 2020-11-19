const db = {
	hobby : require('../models/hobby')
}

module.exports.insertHobby = async(model,query)=>{
	const data = db[model](query);
	return data.save();
}

module.exports.getHobby = async(model)=>{
	const data = db[model];
	return data.findOne();
}