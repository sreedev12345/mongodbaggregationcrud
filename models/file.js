const mongoose = require('mongoose');
const { Schema } = mongoose;

const addfile = new Schema({
	path : {
		type : String
	},
	filename : {
		type :String
	},
	text : {
		type : String
	}
})

let file = mongoose.model('file',addfile);
module.exports = file;