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

//POST /questions/:qID/answers/:aID
//Route for creating answer
router.post('/:qID/answers', function(req, res){
    res.json({
        response:"You Sent a POST request for /answers",
        questionId:req.params.qID,
        body:req.body
    });
});

//PUT /questions/:id/answers
//Route for Editing a specific answer
router.put('/:qID/answers/:aID', function(req, res){
    res.json({
        response:"You Sent a PUT request for /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body:req.body
    });
});

//DELETE /questions/:qID/answers/:aID
//Route for Deleting a specific answer
router.delete('/:qID/answers/:aID', function(req, res){
    res.json({
        response:"You Sent a DELETE request for /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body:req.body
    });
});

//POST /questions//:qID/answers/:aID/vote-up
//POST /questions//:qID/answers/:aID/vote-down
//Route for vote a specific answer
router.post('/:qID/answers/:aID/vote-:dir', function (req, res) {
    res.json({
        response: "You Sent a POST request for /vote-"+req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});

module.exports = router;