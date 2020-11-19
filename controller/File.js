const express = require('express');
const router = express.Router();
const multer = require('multer');
const { insertFile } = require('../repository/file.js');
const allowedMime = ['image/jpeg', 'image/png', 'image/jpg'];
const allowedType = ['xls', 'xlsx', 'csv'];
const _ = require('lodash');
const xlsx = require('xlsx');
const fs = require('fs');

const mimeClone = _.map(allowedMime, _.clone);
const allowclone = _.map(allowedType,_.clone);

const storage = multer.diskStorage({
	destination : function(req,file,cb) {
		let type = _.includes(mimeClone,file.mimetype)===true ? 'images' :'xlsx';
		let path = `./public/${type}`;
		cb(null,path)
	},
	filename:function(req,file,cb) {
		let image = file.originalname.split('.').pop();
		cb(null,Date.now() +'.' + image)
	}
})

const upload = multer({
	storage : storage,
	  fileFilter(req, file, cb) {
	    if (_.includes(mimeClone, file.mimetype) === false) {
	      cb(null,new Error('only images allowed'));
	    } else if(_.includes(allowclone,file.mimetype === false)) {
	    	cb(null,new Error('only excel format allowed'))
	    }else {
      		cb(null, true);
    	}
  	}
}).single('file');

router.post('/addfile',upload,async(req,res)=>{
	console.log(req.file)
	if(req.file.mimetype === 'image/jpeg') {
		const query = {
			path : req.file.path,
			filename : req.file.filename,
			text : req.body.text
		}
		const file = await insertFile('file',query);
		res.json({
			data : file
		})
	} else if(req.file.mimetype!== 'image/jpeg') {
		res.json({
			err : 'only images allowed'
		})
	} else {
		res.json({
			err : 'cant upload'
		})
	}
})

router.post('/xlsx',async(req,res)=>{
	let data = xlsx.readFile('./public/xlsx/Financial Sample1.xlsx')
	let worksheets = data.SheetNames;
    // worksheets.map((sheet,i)=>{
    // 	console.log(sheet)
    // 	const sheets = xlsx.utils.sheet_to_json(sheet);
    // 	console.log(sheets)
    // })
    const data1 = __dirname + '/public/xlsx/Financial Sample1.xlsx';
    const ele = await fs.readFile(data1);
    console.log(ele)
	res.json({
		data : worksheets
	})
})

module.exports = router;