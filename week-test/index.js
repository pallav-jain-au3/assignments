const express = require('express');
const app = express();
const hbs = require('hbs');
const port = 8080;
const userTweets = require('./data/tweets.json');
const users = require('./data/users.json');
const bodyParser = require('body-parser');
const session = require('express-session')

app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.use(bodyParser.urlencoded({
    extended: false
}));


app.set('view engine', 'hbs');


app.get('/', function (req, res) {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        res.render('tweets.hbs', {
            title: "Tweets",
            tweets: userTweets
        })
    }
});


app.get('/login', function (req, res) {
    res.render('login.hbs', {
        title: "Login Page",
    })
});


app.post('/auth', function (req, res) {
    let isValid = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == req.body.username && users[i].password == req.body.password) {
            isValid = true;
            break;
        }
    }
    if (isValid) {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.redirect('/login')
    }

});


app.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/')
})



app.listen(port, function () {
    console.log('Listenning on port' + port);
})