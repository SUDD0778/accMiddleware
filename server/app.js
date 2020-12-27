const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/accedo', {
    db: {
      // safe: true,
      // useNewUrlParser: true, useUnifiedTopology: true 
    }
});
// mongoose.connect('mongodb://127.0.0.1:27017/accedo').then(() => {
// console.log("Connected to Database");
// }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });

require('./route')(app);
// require('mongoose').connect('mongodb+srv://root:root@cluster0.yebyt.mongodb.net/VOD1', {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/api/v1/*', cors());
app.listen(3000,()=> {console.log(`Express server is listening at port 3000`)});


module.exports = app;