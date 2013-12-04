var opencv = require('opencv');
var dateFormat = require('dateformat');

var camera = new opencv.VideoCapture(0);
var stream = camera.toStream();
var faceRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_frontalface_default.xml');
//var lowerbodyRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_lowerbody.xml');
//var upperbodyRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_upperbody.xml');

var numberOfFaces = 0;
var _numberOfFaces = 0;
var _numberOfFacesCount = 0;

var numberOfUpperbodies = 0;
var _numberOfUpperbodies = 0;
var _numberOfUpperbodiesCount = 0;

var numberOfLowerbodies = 0;
var _numberOfLowerbodies = 0;
var _numberOfLowerbodiesCount = 0;

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

exports.takeStill = takeStill;

faceRecognitionStream.on('data', function(faces, videomatrix)
{

    _numberOfFaces += faces.length;
    if(++_numberOfFacesCount === 10)
    {
        _numberOfFaces = Math.round(_numberOfFaces / _numberOfFacesCount);
        _numberOfFaces = 0;
        _numberOfFacesCount = 0;

       if(_numberOfFaces != numberOfFaces)
       {
            numberOfFaces = _numberOfFaces;
           console.log("I see: "+ numberOfFaces + " faces");
       }
    }

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
lowerbodyRecognitionStream.on('data', function(lowerbodies, videomatrix)
{
     _numberOfLowerbodies += lowerbodies.length;
    if(++_numberOfLowerbodiesCount === 10)
    {
        _numberOfLowerbodies = Math.round(_numberOfLowerbodies / _numberOfLowerbodiesCount);
        _numberOfLowerbodies = 0;
        _numberOfLowerbodiesCount = 0;
       if(_numberOfLowerbodies != numberOfLowerbodies)
       {
            numberOfLowerbodies = _numberOfLowerbodies;
           console.log("I see: "+ numberOfLowerbodies + " lower bodies");
       }
    }
});

upperbodyRecognitionStream.on('data', function(upperbodies, videomatrix)
{
     _numberOfUpperbodies += upperbodies.length;
    if(++_numberOfUpperbodiesCount === 10)
    {
        _numberOfUpperbodies = Math.round(_numberOfUpperbodies / _numberOfUpperbodiesCount);
        _numberOfUpperbodies = 0;
        _numberOfUpperbodiesCount = 0;
       if(_numberOfUpperbodies != numberOfUpperbodies)
       {
            numberOfUpperbodies = _numberOfUpperbodies;
           console.log("I see: "+ numberOfUpperbodies + " upper bodies");
       }
    }
});
*/
//stream.pipe(lowerbodyRecognitionStream);
//stream.pipe(upperbodyRecognitionStream);
stream.pipe(faceRecognitionStream);
stream.read();

