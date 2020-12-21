// use the express module 
var express = require('express');
var bodyParser = require('body-parser');
var Joke = require('./public/Joke');

// create an app 
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res){


res.redirect("/jokes.html");

});

// Here I'm gonna get the number of jokes the user wants to get the average words for.
// I need to get the most recent x jokes, and do the average number of words in it.
app.post('/handleJokes', function(req, res) {
    
    let noJokes = parseInt(req.body.noJokes);
    
    Joke.find().sort({_id: 'descending'}).limit(noJokes).find(function(err, post) {
        
            // Get average number of words in all of the jokes

            console.log(post.length);

            let runningSum = 0;

            for (var i = 0; i < post.length; i++){

                console.log(post[i].setup);
                // number of words in sentence!
                console.log(post[i].setup.split(" ").length);

                runningSum += post[i].setup.split(" ").length;

            }

            let toSend = (runningSum / post.length).toString();
            res.send(toSend);

      });

});


app.post('/saveJoke', function(req,res){

//console.log(res);

    const newJoke = new Joke({

        setup: req.body.setup,
        delivery: req.body.delivery

    });


    newJoke.save().then(console.log("Saved joke successfully!"));

// console.log(req.body.setup);
// console.log(req.body.delivery);

});


app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('This is the response to about');
});

// custom 404 page 
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - I do not understand what you mean');
});

// custom 500 page 
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

// speficy the port to listen to. 
app.set('port', process.env.PORT || 3422);


// launch 

app.listen(app.get('port'), function() {

    Joke.deleteMany({},
        function (err) {
            if (err) {
                console.log("error  reading jokes");
            } else {
                console.log("deleted successfully");
            }
        }
    )


    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});