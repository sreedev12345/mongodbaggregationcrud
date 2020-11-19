const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const port = 5000;


const mongourl = 'mongodb://localhost:27017/mongocrud';
mongoose.connect(mongourl,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true,
	useFindAndModify:false
},(err,data)=>{
	if(data) {
		console.log('mongodb_connected_successfully')
	} else {
		console.log('error')
	}
})

app.use('/public', express.static(__dirname + '/public'));;


app.use('/',require('./controller/User.js'));
app.use('/',require('./controller/Hobby.js'));
app.use('/',require('./controller/Comment.js'));
app.use('/',require('./controller/File.js'));

app.get('/',(req,res)=>{
	var name = req.query.name;
	var place = req.query.place;
	res.json({
		name : name,
		place : place
	})
})



app.listen(port,()=>{
	console.log(`server is listening on port ${port}`)
})