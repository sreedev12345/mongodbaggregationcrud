const mongoose = require('mongoose');
const { Schema } = mongoose;

const addcomment = new Schema({
	userid : {
		type : Schema.ObjectId
	},
	comments : {
		type :Array
	}
})

let comment = mongoose.model('comment',addcomment);
module.exports = comment;