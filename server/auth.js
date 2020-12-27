"use strict";

const jwt = require('jsonwebtoken');
const ACCESS_SECRET = require('./secret').ACCESS_SECRET;
exports.isAuthenticated = (req,res,next)=>{
	var token = req.headers.authorization && req.headers.authorization.split(' ')[1];
	if(token){
		jwt.verify(token,ACCESS_SECRET,(err,user)=>{
			if(err) return res.status(401).json({message : "Unauthorized"});
			req.user = user;
			next();
		})
	}else{
		return res.status(401).json({message : "Unauthorized"})
	}

}