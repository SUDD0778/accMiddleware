const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const users = require('./userData').users;
const ACCESS_SECRET = require('./secret').ACCESS_SECRET;

router.post('/',(req,res)=>{
	var user = users.find((tuser)=>tuser.username == req.body.username);
	if(user){
		bcrypt.compare(req.body.password,user.password,(err,result)=>{
			if(err){
				return res.status(401).json({message : "Incorrect Password"})
			}else{
				let token = jwt.sign({username : req.body.username},ACCESS_SECRET);
				return res.status(200).json({message : "Authenticated",token});
			}
		})
	}else{
		return res.status(404).json({message : "user not found"})
	}
});

module.exports = router;