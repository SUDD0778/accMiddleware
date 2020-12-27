const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const ACCESS_SECRET = require('../secret').ACCESS_SECRET;

exports.signUp = function (req, res) {
	try{
		let user = {};
		user.name = req.body.username;
			bcrypt.hash(req.body.password,10,(err,hashedPassword)=>{
				user.password = hashedPassword;
				let newUser = new User(user);
				newUser.save(function (err, user) {
					if (err) return validationError(res, err);
					return res.send({success : true})
				});
			});
	}catch(err){
		console.log(err);
	}	
};

exports.login = function (req, res) {
	User.findOne({name : req.body.username}, function(err, user) {
		if(err)
			return res.status(404).json({message : "user not found"})
		if(user){
			bcrypt.compare(req.body.password,user.password,(err,result)=>{
				if(err)
					return res.status(404).json({message : "user not found"})
				if(!result){
					return res.status(401).json({message : "Incorrect Password"})
				}else{
					let token = jwt.sign({username : req.body.username},ACCESS_SECRET, {expiresIn : 60 * 6});
					return res.status(200).json({message : "Authenticated",token, userId : user._id});
				}
			})
		}else{
			return res.status(404).json({message : "user not found"})
		}
	});

}

exports.changePassword = function(req, res) {

	let name = req.body.username;
	let oldPass = String(req.body.oldPassword);
	let newPass = String(req.body.newPassword);

	    User.findOne({name : name}, function(err, user) {
	        if(err)
	            return res.status(404).json({message : "user not found"})
	        if(user){
	            bcrypt.compare(oldPass,user.password,(err,result)=>{
	                if(!result){
	                    return res.status(401).json({message : "Incorrect Password"})
	                }else{
	                    bcrypt.hash(newPass,10,(err,hashedPassword)=>{
	                        user.password = hashedPassword;
	                        let newUser = new User(user);
	                        newUser.save(function (err, user) {
	                            if (err) return validationError(res, err);
	                            return res.send({success : true})
	                        });
	                    });
	                }
	            })
	        }else{
	            return res.status(404).json({message : "user not found"})
	        }
	    });
	  };

let validationError = function(res, err) {
	return res.json(422, err);
};
