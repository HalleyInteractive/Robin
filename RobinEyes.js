var opencv = require('opencv');
var dateFormat = require('dateformat');

var camera = new opencv.VideoCapture(0);//.toStream();
var stream = camera.toStream();
var faceRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_frontalface_default.xml');//opencv.FACE_CASCADE);
var eyeRecognitionStream = new opencv.ObjectDetectionStream('./node_modules/opencv/data/haarcascade_eye.xml');

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

stream.pipe(faceRecognitionStream);
stream.read();

