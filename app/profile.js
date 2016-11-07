/*
    This server file handles all routing and control which component to show in view for a particular
    action made in web. 
*/

// Native & 3rd party libraries.
var bodyParser = require('body-parser');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();

process.setMaxListeners(0);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname + '/../views')));

app.get('/', function(req,res) {
    res.redirect('/profile');
});
// index page 
app.get('/profile', function(req, res) {
    res.render('index');
});
app.get('/index.ejs', function(req, res) {
	res.redirect('/');
});

app.listen(4000);

console.log('MyProfile listening on 4000.');
