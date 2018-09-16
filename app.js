'use strict';
var express=require('express');
var app=express();
var jsonParser= require('body-parser').json;

var jsonChecker=function (req, res, next){
 if (req.body) {
     console.log('The Sky is', req.body.color);
 } else {
     console.log('There is no body property on the request');
 }
 next();
}

app.use(jsonChecker);

//when app recieve a request this middleware will
//the body. make it accessable from the request body property
app.use(jsonParser());

app.use(jsonChecker);

var port=process.env.PORT || 3000;

app.listen(port,function(){
    console.log('Express server is listening on port:', port);
});