'use strict';

var mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/sandbox");

var db= mongoose.connection;
// Error handler
db.on('error', function(err){
    console.error('connection error: ', err);
});

// Connection is ready to listen
// Occur the first time
db.once('open',function(){
    console.log('db connection successful');
    // All database communication goes here 

    var Schema= mongoose.Schema;
    var AnimalSchema= new Schema({
        type:String,
        color:String,
        size:String,
        mass:Number,
        name:String,
    });

    var Animal= mongoose.model('Animal', AnimalSchema);

    var elephant= new Animal({
        type: "elephant",
        color: "gray",
        size: "big",
        mass: 6000,
        name: "Lawrence",
    });

    // Save is asynchronous when save is the done call back will fire
    elephant.save(function(err){
        if(err) console.error("Save Failed. ", err);
        else console.log("Saved!");
        db.close(function(){
            console.log("DB connection closed");
        });

    });

});