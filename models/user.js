const mongoose = require('mongoose');
const { Schema } = mongoose;

const userregister = new Schema({
	username : {
		type :String,
	},password : {
		type : String,
	},email : {
		type : String,
	},status : {
		type : Number,
	},authtoken : {
		type :String
	}
})

var user = mongoose.model('user',userregister);
module.exports = user;