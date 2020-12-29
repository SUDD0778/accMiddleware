"use strict";
const cors = require('cors');
const winston = require('winston'),
	expressWinston = require('express-winston');
require('winston-mongodb');
const {
	createLogger,
	transports ,
	format} = winston;
	
module.exports = (app)=>{

	app.use(expressWinston.logger({
		transports: [
		  new transports.MongoDB({
			db : 'mongodb+srv://root:root@cluster0.yebyt.mongodb.net/VOD1',
			level : "info",
			collection : 'logs',
			format : format.combine(format.timestamp(),format.json()),
			meta: true,
			metaKey:'meta',
			msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
			expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
		  })
		]
	}));

	
	app.use('/api/v1/user',require('./user'));
	app.use('/api/v1/movies',require('./movies'));
	app.use('/api/v1/userActivity',require('./userActivity'));
	app.use('/api/v1/logs',require('./logs'));

	app.use(expressWinston.errorLogger({
		transports: [
		  new transports.MongoDB({
			db : 'mongodb+srv://root:root@cluster0.yebyt.mongodb.net/VOD1',
			level : "error",
			collection : 'logs',
			format : format.combine(format.timestamp(),format.json()),
			meta: true,
			metaKey:'meta',
			msg: "HTTP {{req.method}} {{req.url}}",
			expressFormat: true, 
		  })
		]
	}));
}
