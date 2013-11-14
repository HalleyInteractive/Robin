/* globals exports, require */

var speech = require('node-tts');
var fs = require('fs');
var spawn = require('child_process').spawn;
var tts = null;

exports.say = function (message)
{
	// TODO: Check if audio is still playing. If it is, que the new request
	console.log(exports.robin);
	speech.retrieve(message, exports.robin.language.toString().substr(0,2), function(text, lang, data)
	{
		fs.writeFile("input.mp3", data, function(err)
		{
			if (err)
			{
				console.log("Error saving voice input to the disk: " + err);
			}
			else {
				tts = spawn('mplayer', ["input.mp3"]);
				tts.stderr.on('data', function (data) { console.log('Error playing voice input: ' + data); });
				tts.on('close', function (code) { console.log('child process exited with code ' + code); });
			}
		});
	}, function(){ console.log("Error retrieving voice data"); });
};
