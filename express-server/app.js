const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const gridfs = require('gridfs-stream');
const app = express();
const url = 'mongodb://localhost:27017/employeesDB';
routerEmployees = require('./routers/employees');
const multer = require('multer');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("file"));

app.listen(3000, () => {
  mongoose.Promise = require('bluebird');
  mongoose.set('useFindAndModify', false);
  gridfs.mongo = mongoose.mongo;
  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MONGOD!');
    })
    .catch((err) => {
      console.log('Failed to establish connection with MONGOD!');
      console.log(err.message);
    });
  console.log('Example app listening on port 3000!');
});

routerEmployees.employees(app);

module.exports = app;
