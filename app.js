'use strict';
var express=require('express');
var app=express();
var routes=require('./routes');

var jsonParser= require('body-parser').json;


//when app recieve a request this middleware will
//the body. make it accessable from the request body property
app.use(jsonParser());

// Push to Questions
app.use('/questions',routes);

var port=process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Express server is listening on port:', port);
});