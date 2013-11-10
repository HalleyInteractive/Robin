
var spawn = require('child_process').spawn;
var tts = null;
var printoutput = true;
var printerrors = true;
var printexits = true;

var voice = 'default';
var voiceVariant = '+2';
var pitch = 50; // Adjusts the pitch in a range of 0 to 99. The default is 50.
var amplitude = 100; // Sets amplitude (volume) in a range of 0 to 200. The default is 100.
var speed = 140; // Sets the speed in words-per-minute.
var wordGap = 0; // Word gap. This option inserts a pause between words. The value is the length of the pause, in units of 10 mS

tts = spawn('espeak', [
	'-v', voice+voiceVariant,
	'-p', pitch,
	'-a', amplitude,
	'-s', speed,
	'-g', wordGap
]);

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
	//tts.stdin.write("(SayText \"" + message + "\")");
	tts.stdin.write(message+"\n");
};
