const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('./route')(app);
require('mongoose').connect('mongodb+srv://root:root@cluster0.yebyt.mongodb.net/VOD1', {useNewUrlParser: true, useUnifiedTopology: true});
app.use('/api/v1/*', cors());
app.listen(3000,()=> {console.log(`Express server is listening at port 3000`)});


module.exports = app;