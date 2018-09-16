'use strict';

var express = require('express');
var router = express.Router();

//GET /questions
//Function route handler
//Return all the questions
router.get('/', function(req, res){
    res.json({response:"You sent a GET request"});
});

//POST /questions
//Route for creating questions
router.post('/', function(req, res){
    res.json({
        response:"You sent a POST request",
        body: req.body
    });
});

//GET /questions/:id
//Route for specific questions
router.get('/:id', function(req, res){
    res.json({
        response:"You Sent a GET request for ID" + req.params.id
    });
});



module.exports = router;