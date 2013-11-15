/* globals exports, require */

var speech = require('node-tts');
var fs = require('fs');
var spawn = require('child_process').spawn;
var tts = null;
var talking = false;
var que = [];

exports.say = function (message, callback)
{
	if(!talking)
	{
		talking = true;
		speech.retrieve(message, exports.robin.language.toString().substr(0,2), function(text, lang, data)
		{
			fs.writeFile("input.mp3", data, function(err)
			{
				if (err)
				{
					console.log("Error saving voice input to the disk: " + err);
					doneTalking(callback);
				}
				else {
					tts = spawn('mplayer', ["input.mp3"]);
					tts.on('close', function (code)
					{
						console.log('child process exited with code ' + code);
						doneTalking(callback);
					});
				}
			});
		}, function(){ console.log("Error retrieving voice data"); doneTalking(callback); });
	} else
	{
		console.log("Que message: " + message);
		que.push({message:message, callback:callback});
	}
};

function doneTalking(callback)
{
	console.log("Done talking");
	talking = false;
	if(callback !== undefined && callback !== null) { callback(); }
	if(que.length > 0)
	{
		console.log("Que not empty: ");
		var m = que.shift();
		console.log(m);
		exports.say(m.message, m.callback);
	}
}
