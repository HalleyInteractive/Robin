#!/usr/bin/env node

var spawn = require('child_process').spawn;
var stt = null;
var printoutput = true;
var printerrors = false;
var printexits = false;

/**
 * Module exports.
 */
exports = module.exports = RobinEars;

function RobinEars (opts)
{
	stt = spawn('pocketsphinx_continuous', ['-lm', 'Dictionary/5510.lm', '-dict', 'Dictionary/5510.dic']),
	
	stt.stdout.on('data', function (data)
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
				this.runCommand(outputLine.substring(11));
			} else
			{
				// OTHER
				if (printoutput) {console.log("Other: " + outputLine); }
			}
		}
	});
	
	stt.stderr.on('data', function (data)
	{
		if (printerrors) { console.log('stderr: ' + data); }
	});
	
	stt.on('close', function (code)
	{
		if (printexits) { console.log('child process exited with code ' + code); }
	});
}

RobinEars.prototype.runCommand = function(cmd)
{
	switch(cmd)
	{
		case "HELLO":
			console.log("Running command Hello");
		break;
		case "TESTING":
			console.log("Running command Testing");
		break;
		default:
			console.log("Command not found:-" + cmd + "-");
		break;
	}
}
