const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

var tweets = [{
        name: "digitizer",
        tweet: "This is a cool piece of information."
    },
    {name: "M0SH",
        tweet: "@digitizer I agree."
    }
];


app.use('/', express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/index.html')
});

app.get('/getTweets', function (req, res) {
    res.json(tweets)
});

app.use('/add-tweet', bodyParser.json());

app.post('/add-tweet', function (req, res) {
    console.log(req.body)
    tweets.push(req.body);
    res.json({Sucees: req.body.name  + "tweeted" })
});

app.put('/add-tweet/:name', function(req, res){
   console.log(req.body)
 let index ;
 for (let i = 0; i < tweets.length; i++){
     if(req.body.name.toLowerCase() === tweets[i].name.toLowerCase()){
         index = i;
         break;
     }
 }
   tweets[index].tweet = req.body.tweet;
   res.json({Sucess: req.body.name + "is updated"})

});

app.delete('/delete-tweet/:name', function(req, res){
    let index ;
    for (let i = 0; i < tweets.length; i++){
        if(req.params.name.toLowerCase() === tweets[i].name.toLowerCase()){
            index = i;
            break;
        }
    }
      tweets.splice(index, 1);
      res.json({Sucess: req.params.name + "is deleted"})
   
   });




app.listen(8080, function () {
    console.log("Listening on localhost:8080")
});