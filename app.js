'use strict';
var express=require('express');
var app=express();
var routes=require('./routes');

var jsonParser= require('body-parser').json;
var logger = require('morgan');

app.use(logger('dev'));
//when app recieve a request this middleware will
//the body. make it accessable from the request body property
app.use(jsonParser());


var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;
// Error handler
db.on('error', function (err) {
    console.error('connection error: ', err);
});

// Connection is ready to listen
// Occur the first time
db.once('open', function () {
    console.log('db connection successful');
});

// Push to Questions
app.use('/questions',routes);

// Middleware catch 404 and forward to error handler 
app.use(function(req, res, next){
    var err= new Error("Not Found");
    err.status=404;
    next(err);
});

// Erorr handler -4 parameters
app.use(function(err,req, res, next){
    // If error is not defined 500 is used
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    });
});

var port=process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Express server is listening on port:', port);
});