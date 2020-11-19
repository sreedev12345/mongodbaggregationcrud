const mongoose = require('mongoose');
const { Schema } = mongoose;

const addhobby = new Schema({
	userid : {
		type : Schema.ObjectId
	},
	hobbies : {
		type :Array
	}
})

let hobby = mongoose.model('hobby',addhobby);
module.exports = hobby;