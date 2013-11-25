/* globals exports, require */

var http = require('http');
var url = require('url');
var fs = require('fs');
var spawn = require('child_process').spawn;
var tts = null;
var talking = false;
var que = [];
var _callback = null;

exports.say = function (message, callback)
{
    _callback = callback !== null && callback !== undefined ? callback : function(){};
	if(!talking)
	{
		talking = true;
        console.log("Say: "+message);
        var query = exports.brain.db.table("voice")
        .filter({text:message, language:exports.robin.language.toString().substr(0,2)})
        .limit(1);
        query.count().run({connection:exports.brain.connection, useOutdated:true}, function(err, result)
        {
            if (err) throw err;
            if(result > 0)
            {
                query.run({connection:exports.brain.connection, useOutdated:true}, function(err, result)
                {
                    if (err) throw err;
                    result.next(function(err, row)
                    {
                        if (err) throw err;
                        speak(new Buffer(row.buffer, 'binary'));
                    });
                });
            } else { requestGoogleAudio(message); }
        });
	} else
	{
		console.log("Que message: " + message);
		que.push({message:message, callback:callback});
	}
};

function speak(buffer)
{
    fs.writeFile("input.mp3", buffer, function(err)
    {
        if (err){ console.log("Error saving voice input to the disk: " + err); doneTalking(_callback); }
        else
        {
            tts = spawn('mplayer', ["input.mp3"]);
            tts.on('error', function(e) { console.log("Error playing audio"); });
            tts.on('close', function (code) { console.log('child process exited with code ' + code); doneTalking(_callback); });
        }
    });
}

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
            exports.brain.db.table("voice")
            .insert({text:message, language:exports.robin.language.toString().substr(0,2), buffer:buffer})
            .run({connection:exports.brain.connection, noreply:true}, function(err, result)
            {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            });
            speak(buffer);
        });
    });
    req.on('error', function(e) { console.log('problem with request: ' + e.message); error(e); });
    req.end();
}

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
