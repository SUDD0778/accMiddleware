"use strict";

const jwt = require('jsonwebtoken');
const express = require('express');
const ACCESS_SECRET = require('../secret').ACCESS_SECRET;

exports.isAuthenticated = (req,res,next)=>{
	let token = req.headers.authorization;
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