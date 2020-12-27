const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const winston = require('winston');

app.use(express.json());

require('./route')(app);
require('mongoose').connect('mongodb+srv://root:root@cluster0.yebyt.mongodb.net/VOD1', {useNewUrlParser: true, useUnifiedTopology: true});
app.use('/api/v1/*', cors());
app.listen(3000,()=> {console.log(`Express server is listening at port 3000`)});


module.exports = app;