var spawn = require('child_process').spawn;
var stt_basic = null;
var stt_extended = null;
var printoutput = true;
var printerrors = false;
var printexits = false;
var mode = "off";

// TODO: Read corpus file and compile a new database when this module starts
function stt_basic_start()
{
	if(mode === "basic") { console.log("Could not start basic stt, it's already running."); }
	else if(mode === "extended") { console.log("Could not start basic stt, extended stt is still running"); }
	else if(mode === "off")
	{
		mode = "basic";
		stt_basic = spawn('pocketsphinx_continuous', ['-lm', 'Dictionary/Robin.lm', '-dict', 'Dictionary/Robin.dic']);
		stt_basic.stdout.on('data', function (data)
		{
			var output = data.toString("utf-8").match(/[^\r\n]+/g);
			for(var i = 0; i < output.length; i++)
			{
				var outputLine = output[i];
				if(outputLine.substring(0, 5) === "READY")
				{
					// READY
					if (printoutput) { console.log("Ready"); }
				} else if(outputLine.substring(0, 9)=== "Listening")
				{
					// LISTENING
					if (printoutput) { console.log("Listening"); }
				} else if(outputLine.substring(0, 17)=== "Stopped listening")
				{
					// STOPPED LISTENING
					if (printoutput) { console.log("Stopped listening"); }
				} else if(outputLine.substring(0, 9).toString().match(/\d{9}/))
				{
					// COMMAND
					if (printoutput) { console.log("CMD: " + outputLine.substring(11)); }
					exports.basiccmd(outputLine.substring(11));
				} else
				{
					// OTHER
					if (printoutput) {console.log("Other: " + outputLine); }
				}
			}
		});

		stt_basic.stderr.on('data', function (data) { if (printerrors) { console.log('stderr: ' + data); } });
		stt_basic.on('close', function (code) { if (printexits) { console.log('child process exited with code ' + code); } });
	}
}

function stt_basic_stop()
{
	if(mode === "basic")
	{
		stt_basic.kill();
		stt_basic = null;
		mode = "off";
	} else { console.log("Basic stt not running."); }
}

function stt_extended_start()
{
	if(mode === "extended") { console.log("Could not start extended stt, it's already running."); }
	else if(mode === "basic") { console.log("Could not start extended stt, basic stt is still running"); }
	else if(mode === "off")
	{
		mode = "extended";
		stt_extended = spawn('arecord', ['-f', 'cd', '-t', 'wav', '-d', '5', '-r', '16000' , 'output.wav']);
		stt_extended.stdout.on('data', function (data)
		{
			var output = data.toString("utf-8").match(/[^\r\n]+/g);
			for(var i = 0; i < output.length; i++)
			{
				var outputLine = output[i];
				console.log("Data: " + outputLine);
			}
		});
		stt_extended.stderr.on('data', function (data) { if (printerrors) { console.log('stderr: ' + data); } });
		stt_extended.on('close', function (code) { if (printexits) { console.log('child process exited with code ' + code); } });
	}
}

function stt_extended_stop()
{
	if(mode === "extended")
	{
		stt_extended.kill();
		stt_extended = null;
		mode = "off";
	} else { console.log("Extended stt not running."); }
}

exports.stt_mode = mode;
exports.stt_basic_start = stt_basic_start;
exports.stt_basic_stop = stt_basic_stop;
exports.stt_extended_start = stt_extended_start;
exports.stt_extended_stop = stt_extended_stop;

exports.basiccmd = function (cmd) { }
exports.extendedcmd = function (cmd) { }
