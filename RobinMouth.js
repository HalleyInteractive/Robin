
var spawn = require('child_process').spawn;
var tts = null;
var printoutput = true;
var printerrors = false;
var printexits = false;


tts = spawn('festival');

tts.stdout.on('data', function (data)
{
	var output = data.toString("utf-8").match(/[^\r\n]+/g);
	for(var i = 0; i < output.length; i++)
	{
		var outputLine = output[i];
		console.log(output[i]);
	}
});

tts.stderr.on('data', function (data)
{
	if (printerrors) { console.log('stderr: ' + data); }
});

tts.on('close', function (code)
{
	if (printexits) { console.log('child process exited with code ' + code); }
});

exports.say = function (message)
{
	tts.stdin.write("(SayText \"" + message + "\")");
}
