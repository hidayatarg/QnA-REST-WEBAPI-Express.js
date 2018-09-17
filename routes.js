'use strict';

var express = require('express');
var router = express.Router();
var Question= require('./models/models').Question;

// for specific question route
// callback is execu. ??qID present??
router.params('qID',function(req, res, next,id){
    Question.findById(id, function (err, doc) {
        if (err) return next(err);
        // If document not found
        if(!doc){
            err = new Error("Not Found");
            err.status=404;
            return next(err);
        }
        req.question=doc;
        return next();

    });
});

// for specific answer route
router.params('aID', function(req, res, next, id){
    req.answer=req.question.answers.id(id);
    if(!req.answer){
        err = new Error("Not Found");
        err.status=404;
        return next(err);
    }
    // To pass control back to router
    next();

});

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
    res.json(req.question);
});

//POST /questions/:qID/answers/:aID
//Route for creating answer
router.post('/:qID/answers', function(req, res, next){
    req.question.answer.push(req.body);
    req.question.save(function (err, question) {
        if (err) return next(err);
        err.status(201);
        //return document as json to client
        res.json(question);
    });  
});

//PUT /questions/:id/answers
//Route for Editing a specific answer
router.put('/:qID/answers/:aID', function(req, res){
    // Answer is Loaded
    req.answer.update(req.body, function(err, result){
        if(err) return next(err);
        res.json(result)
    });  
});

//DELETE /questions/:qID/answers/:aID
//Route for Deleting a specific answer
router.delete('/:qID/answers/:aID', function(req, res){
   req.answer.remove(function (err){
       req.question.save(function(err, question){
            if(err) return next(err);
            res.json(question);
       });
   });
});

//POST /questions//:qID/answers/:aID/vote-up
//POST /questions//:qID/answers/:aID/vote-down
//Route for vote a specific answer
router.post('/:qID/answers/:aID/vote-:dir', 
    function (req, res, next){
        if (req.body.params.dir.search(/^(up|down)$/)===-1){
            var err= new Error("Not Found");
            err.status=404;
            next(err);
        }else{
            // If contents are valid
            req.vote = req.params.dir;
            next();
        }

},

function(req, res) {
    req.answer.vote(req.vote, function(err, question){
        if(err) return next(err);
        res.json(question);
    })
   
});

module.exports = router;