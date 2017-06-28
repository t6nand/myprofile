var exec = require('exec');
var fs = require('fs');
var multer = require('multer');
var projectconf = require(__dirname + '/../projectconf.json');
var upload = multer({dest : __dirname + '/../../views/uploads/'});

var fromDecisionTree = "From Decision Tree";
var confidenceFromDecisionTree = "Confidence from Decision Tree";
var fromWaveletTransform = "From Wavelet Transform";
var confidenceFromWaveletTransform = "Confidence from wavelet transform";
var isBlurred = "Is_Blurred";
var resultJSONName = "resultJSON";
var imgPathName = "imgPath";

var decisionIIR;
var confIIR;
var decisionHAARWT;
var confHAARWT;
var isblurred;

exports.type = upload.single('pic');
exports.saveImageLocallly = function(req, res) {
  console.log(req.file); // this displays the userPhoto's properties
  var tmp_path = req.file.path;
  var target_path = __dirname + '/../../views/uploads/' + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() {
    cmd = exec(
         projectconf.blurdetection + " " + target_path,
        function(error, stdout, stderr) {
          if (error) {
            console.log("Failed to execute command. Got: " + error);
          } else {
            var blurResults = stdout.split(",");
            if (blurResults.length != 5) {
              throw error("Command execution failure: " + stdout);
            } else {
              for (var i = 0; i < blurResults.length; i++) {
                if (blurResults[i].match(fromDecisionTree)) {
                  var data = blurResults[i].split(":");
                  if (data) {
                    decisionIIR = data[1];
                  }
                }
                if (blurResults[i].match(confidenceFromDecisionTree)) {
                  var data = blurResults[i].split(":");
                  if (data) {
                    confIIR = data[1];
                  }
                }
                if (blurResults[i].match(fromWaveletTransform)) {
                  var data = blurResults[i].split(":");
                  if (data) {
                    decisionHAARWT = data[1];
                  }
                }
                if (blurResults[i].match(confidenceFromWaveletTransform)) {
                  var data = blurResults[i].split(":");
                  if (data) {
                    confHAARWT = data[1];
                  }
                }
                if (blurResults[i].match(isBlurred)) {
                  var data = blurResults[i].split(":");
                  if (data) {
                    isblurred = data[1];
                  }
                }
              }
            }
          }
          var filePath = req.file.originalname;
          res.redirect('displayBlurResults');
          exports.filePath = filePath;
          exports.fromDecisionTree = decisionIIR.trim();
          exports.confidenceFromDecisionTree = confIIR.trim();
          exports.fromWaveletTransform = decisionHAARWT.trim();
          exports.confidenceFromWaveletTransform = confHAARWT.trim();
          exports.isBlurred = isblurred.trim();
          fs.unlinkSync(tmp_path);
        });
  });
  src.on('error', function(err) {
    //  res.render('error');
    console.log("Error case. Lol");
  });
}
