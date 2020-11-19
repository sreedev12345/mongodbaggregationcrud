const db = {
	file : require('../models/file.js')
}

module.exports.insertFile = async(model,query)=>{
	const data = db[model](query);
	return data.save();
}