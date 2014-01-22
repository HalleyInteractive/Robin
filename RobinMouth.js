/* globals exports, require, Buffer */

/* http include */
var http = require('http');

/* url include */
var url = require('url');

/* file system include */
var fs = require('fs');

/* child process span include */
var spawn = require('child_process').spawn;

/* tts, Text To Speech is used to run mplayer as a child process */
var tts = null;

/* If true mplayer is still playing a file */
var talking = false;

/* When talking is true, new messages will be added to this que. */
var que = [];

/* Function to be called after the message has been played */
var _callback = null;

/* States if the audio clip should be cached to the database */
var _cache = true;

/**
* Converts message to a spoken text
*
* @method say
* @param {String} message Text to be spoken
* @param {Function} callback Function to be called after the text has been spoken.
* @param {Boolean} if set to false the audio clip will not be saved to the database
*/
exports.say = function (message, callback, cache)
{
    _callback = callback !== null && callback !== undefined ? callback : function(){};
	_cache = cache === false ? false : true;
	if(!talking)
	{
		talking = true;
		exports.brain.db.query.exec("FOR v in Voice FILTER v.text == '"+message+"' && v.language == '"+exports.robin.language.toString().substr(0,2)+"' LIMIT 1 RETURN v.buffer", function(err, ret)
		{
			if(err || ret.result.length === 0)
			{
				requestGoogleAudio(message);
			} else
			{
				speak(new Buffer(ret.result[0]));
			}
		});
	} else
	{
		console.log("Que message: " + message);
		que.push({message:message, callback:callback, cache:cache});
	}
};

/**
* Converts a binary audio buffer to a mp3 for playback.
* mplayer is used for playback of the file.
*
* @method speak
* @param {Buffer} buffer binary audio buffer
*/
function speak(buffer)
{
    fs.writeFile("input.mp3", buffer, function(err)
    {
        if (err){ console.log("Error saving voice input to the disk: " + err); doneTalking(_callback); }
        else
        {
            tts = spawn('mplayer', ["input.mp3"]);
            tts.on('error', function() { console.log("Error playing audio"); });
            tts.on('close', function (/*code*/) { /* console.log('child process exited with code ' + code); */ doneTalking(_callback); });
        }
    });
}

/**
* The message parameter will be converted to a binary audio buffer by Google translate.
* Language is determined by RobinConfig.
*
* @method requestGoogleAudio
* @param {String} message text to be converted to a spoken message.
*/
function requestGoogleAudio(message)
{
    var ur = url.parse("translate.google.com/translate_tts", true);
    ur.query = { 'tl': exports.robin.language.toString().substr(0,2), 'q': message };
    var formated = url.parse(url.format(ur), true);
    console.log(formated.path);
    var options = {
        host: 'translate.google.com',
        path: formated.path,
        headers: { 'user-agent': 'Mozilla/5.0' }
    };
    var req = http.request(options, function(res)
    {
        var data = [];
        var chunks = 0;
        res.on('data', function(chunk) { chunks++; data.push(chunk); }).on('end', function()
        {
            var buffer = Buffer.concat(data);
            if (buffer.length === 0) { console.log("Retrieved empty data!"); }
            else
            {
				if(_cache)
				{
					exports.brain.db.document.create('Voice', {text:message, language:exports.robin.language.toString().substr(0,2), buffer:buffer}).then(function(res)
					{
						console.log("Created database entry: %j", res);
					},function(err)
					{
						console.log("Error creating database entry: %j", err);
					});
				}
				speak(buffer);
            }
        });
    });
    req.on('error', function(e) { console.log('problem with request: ' + e.message); });
    req.end();
}

/**
* This method is called when mplayer is finished playing the file.
* If another message is in the queu it will be player, otherwise callback will be triggered.
*
* @method doneTalking
* @param {Funtion} callback function to be called after playback of the file.
*/
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
		exports.say(m.message, m.callback, m.cache);
	}
}
