/*
    This server file handles all routing and control which component to show in
   view for a particular
    action made in web.
*/

// Native & 3rd party libraries.
var bodyParser = require('body-parser');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var pictures = require(__dirname + '/controllers/pictures');
process.setMaxListeners(0);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname + '/../views')));

// app.use(multer({ dest: __dirname + '/../upload'}).single('userPhoto'));

app.get('/', function(req, res) { res.render('index.ejs'); });
// index page
app.get('/profile', function(req, res) { res.render('profile.ejs'); });

app.get('/projects', function(req, res) { res.render('projects.ejs'); });

app.get('/contactme', function(req, res) { res.render('contactme.ejs'); });

app.get('/displayBlurResults', function(req, res) {
  res.render('displayBlurResults.ejs', {
    filePath : pictures.filePath,
    fromDecisionTree : pictures.fromDecisionTree,
    confidenceFromDecisionTree : pictures.confidenceFromDecisionTree,
    fromWaveletTransform : pictures.fromWaveletTransform,
    confidenceFromWaveletTransform : pictures.confidenceFromWaveletTransform,
    isBlurred : pictures.isBlurred
  });
});
app.post('/picupload', pictures.type, pictures.saveImageLocallly);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports.express;
