const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const ACCESS_SECRET = require('../secret').ACCESS_SECRET;

exports.signUp = function (req, res) {
	console.log("signUp");
	try{
		let user = {};
		user.name = req.body.username;
			bcrypt.hash(req.body.password,10,(err,hashedPassword)=>{
				user.password = hashedPassword;
				var newUser = new User(user);
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
					let token = jwt.sign({username : req.body.username},ACCESS_SECRET);
					return res.status(200).json({message : "Authenticated",token, userId : user._id});
				}
			})
		}else{
			return res.status(404).json({message : "user not found"})
		}
	});

}

exports.changePassword = function(req, res) {

	    var name = req.body.username;
	    var oldPass = String(req.body.oldPassword);
	    var newPass = String(req.body.newPassword);

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
	                        var newUser = new User(user);
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
	
//      User.findOne({name : name}, function (err, user) {
// 	       if(err)
// 	      return res.status(404).json({message : "user not found"})
// 	       if(user.authenticate(oldPass)) {
// 	      user.password = newPass;
// 	      user.save(function(err, user) {
// 	        if (err) {console.log(err); return validationError(res, err);}
// 	        logger.user('info', {user_id: user._id, message: 'Password changed.'});
// 	        res.send(200);
// 	      });
// 	       } else {
// 	      res.send(403);
// 	       }
// 	     });
	  };

var validationError = function(res, err) {
	return res.json(422, err);
};
