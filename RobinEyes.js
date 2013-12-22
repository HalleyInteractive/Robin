/* globals exports, require */

/*
* Include openCV
* Node Bindings to OpenCV
* Author: Peter Braden
* Github: https://github.com/peterbraden/node-opencv
*/
var opencv = require('opencv');

/*
* A node.js package for Steven Levithan's excellent dateFormat() function.
* Author: Steven Levithan
* Github: https://github.com/felixge/node-dateformat
*/
var dateFormat = require('dateformat');

/* Set up the videocapture */
try { var camera = new opencv.VideoCapture(3); }
catch(err) { try { var camera = new opencv.VideoCapture(4); }
catch(err) { var camera = new opencv.VideoCapture(5); } }

/* Set up the videostream */
var stream = camera.toStream();

/* Open face recognition cascade file*/
var faceRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_frontalface_default.xml');

/* Open lower body recognition cascade file*/
var lowerbodyRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_lowerbody.xml');

/* Open upper body recognition cascade file*/
var upperbodyRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_upperbody.xml');

/*
* Takes a still image of the current videostream
* Image is saved in tmp folder with the current timestamp
*/
function takeStill()
{
    return camera.read(function(err, im)
    {
        if(err){ console.log(err); }
        var filename = './tmp/camera_still_' + dateFormat(new Date(), "hMMss") + '.png';
        im.save(filename);
        return filename;
    });
}

/*
* Handle the face recognition stream.
*/
faceRecognitionStream.on('data', function(faces, videomatrix)
{
    var sx = 0;
    var sy = 0;

    if(faces.length > 0)
    {
        // Shift
        var vxc = videomatrix.width() / 2; // Video x center
        var vyc = videomatrix.height() / 2; // Video y center

        var fxc = faces[0].x + (faces[0].width / 2); // Face x center
        var fyc = faces[0].y + (faces[0].height / 2); // Face y center

        sx = parseInt(vxc - fxc, 10);
        sy = parseInt(vyc - fyc, 10);

        // Margin
        var margin = 50;
        sx = sx < 0-margin || sx > margin ? sx : 0;
        sy = sy < 0-margin || sy > margin ? sy : 0;

        var movestring = "";

        if(sx < 0) { movestring = "x: right"; } else if(sx > 0) { movestring = "x: left"; } else { movestring = "x: still"; }
        if(sy < 0) { movestring += " y: down"; } else if(sy > 0) { movestring += " y: up"; } else { movestring += " y: still"; }

        // console.log("Shift x: " + sx + " y: " + sy);
        // console.log(movestring);
    }
    // console.log(faces);
});

/*
* Handle the lower body recognition stream.
*/
lowerbodyRecognitionStream.on('data', function(lowerbodies, videomatrix)
{
	// console.log("I see " + lowerbodies.length + " lower bodies");
	// Look up
});

/*
* Handle the upper body recognition stream.
*/
upperbodyRecognitionStream.on('data', function(upperbodies, videomatrix)
{
	// console.log("I see " + upperbodies.length + " upper bodies");
	// Look up
});

/*
* Pipe video stream through recognition handlers
*/
stream.pipe(lowerbodyRecognitionStream);
stream.pipe(upperbodyRecognitionStream);
stream.pipe(faceRecognitionStream);
stream.read();

/* Export functions */
exports.takeStill = takeStill;
