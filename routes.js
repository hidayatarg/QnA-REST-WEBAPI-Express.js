'use strict';

var express = require('express');
var router = express.Router();
var Question= require('./models/models').Question;

//GET /questions
//Function route handler
//Return all the questions
// Projection  // Descending order
router.get('/', function(req, res, next){
    Question.find({})
                .sort( {createdAt:-1})
                .exec (function(err, questions){
                        if(err) return next(err);
                        res.json(questions);
                });
});

//POST /questions
//Route for creating questions
router.post('/', function(req, res, next){
    var question= new Question(req.body);
    question.save(function(err, question){
        if(err) return next(err);
        err.status(201);
        //return document as json to client
        res.json(question);
    });

    res.json({
        response:"You sent a POST request",
        body: req.body
    });
});

//GET /questions/:id
//Route for specific questions
router.get('/:id', function(req, res, next){
    Question.findById(req.params.qID, function(err, doc){
        if(err) return next(err);
        res.json(doc);

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
router.post('/:qID/answers/:aID/vote-:dir', function (req, res, next){
    if (req.body.params.dir.search(/^(up|down)$/)===-1){
        var err= new Error("Not Found");
        err.status=404;
        next(err);
    }else{
        // If contents are valid
        next();
    }

},

function(req, res) {
    
    res.json({
        response: "You Sent a POST request for /vote-"+req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});

module.exports = router;