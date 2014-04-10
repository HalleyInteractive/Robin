/* globals exports, require, global */

/*
* RobinEars.js
* Listens for voice input.
*/

/*
* Google Speech API wrapper for node. Is used for the extended voice input.
* Author: Dennis psirenny
* Github: https://github.com/psirenny/node-google-speech-api
*/
var google = require('google-speech-api');

/* Spawn for the child processes */
var spawn = require('child_process').spawn;

/* Speech to Text - PocketSphinx process. */
var stt_basic = null;

/* Speech to Text - ARecord process */
var stt_extended = null;

/* Log PocketSphinx output to the console */
var printoutput = true;

/* Log PocketSphinx errors to the console */
var printerrors = false;

/* Log PocketSphinx process exits to the console */
var printexits = false;

/*
* Current mode of RobinEars. Can be off, basic, extended
* @global
*/
var mode = "off";

/* Is set true by the first time the basic hearing is started */
var inited = false;

/* Callback function for the init function */
var initCallback = null;

/* Callback in case somthing goes wrong when the init function is called */
var initErrorCallback = null;

/**
* Starts PocketSphinx for basis hearing
*
* @global
* @method stt_basic_start
*/
function stt_basic_start()
{
	if(mode === "basic") { console.log("Could not start basic stt, it's already running."); }
	else if(mode === "extended") { console.log("Could not start basic stt, extended stt is still running"); }
	else if(mode === "off")
	{
		mode = "basic";
        console.log("Start basic hearing");
		stt_basic = spawn('pocketsphinx_continuous', ['-lm', 'Dictionary/Robin.lm', '-dict', 'Dictionary/Robin.dic', '-adcdev', 'plughw:'+global.robin.settings.audiodevice]);
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
					if (inited === false && initCallback !== null)
					{
						initCallback();
						inited = true;
						initCallback = null;
						initErrorCallback = null;
					}
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
					global.robin.runBasicCommand(outputLine.substring(11));
				} else
				{
					// OTHER
					if (printoutput) {console.log("Other: " + outputLine); }
				}
			}
		});

		stt_basic.stderr.on('data', function (data) { if (printerrors) { console.log('stderr: ' + data); } });
		stt_basic.on('close', function (code) { if (printexits || code === 255) { console.log('child process exited with code ' + code); } });
	}
}

/**
* Stops basic hearing process
*
* @global
* @method stt_basic_stop
*/
function stt_basic_stop()
{
	if(mode === "basic")
	{
		stt_basic.kill();
		stt_basic = null;
		mode = "off";
	} else { console.log("Basic stt not running."); }
}

/**
* Start arecod process for 7 second recording of voice input. This will be send to google for processing
*
* @global
* @method stt_extended_start
*/
function stt_extended_start()
{
	if(mode === "extended") { console.log("Could not start extended stt, it's already running."); }
	else if(mode === "basic") { console.log("Could not start extended stt, basic stt is still running"); }
	else if(mode === "off")
	{
		mode = "extended";
		stt_extended = spawn('arecord', ['-f', 'cd', '-t', 'wav', '-d', '7', '-r', '16000', '-D', 'plughw:'+global.robin.settings.audiodevice, 'tmp/output.wav']);
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
		stt_extended.on('close', function (code)
		{
			if(code === 0)
			{
				// TODO: Stop process on time out
				google({lang:global.robin.settings.language, file: 'tmp/output.wav'}, function (err, results)
				{
					if(results[0] !== undefined && results.length > 0)
					{
						if(results[0].hypotheses !== undefined && results[0].hypotheses.length > 0)
						{
							console.log("STT Result: " + results[0].hypotheses[0].utterance);
							global.robin.runExtendedCommand(results[0].hypotheses[0].utterance.toUpperCase());
							stt_extended_stop();
							stt_basic_start();
						} else
						{
							global.robin.plugins.disappoint.didNotUnderstand();
							stt_extended_stop();
							stt_basic_start();
						}
					} else
					{
						global.robin.plugins.disappoint.didNotUnderstand();
						stt_extended_stop();
						stt_basic_start();
					}
				});
			}
		});
	}
}

/**
* Stops the extended voice input
*
* @global
* @method stt_extended_stop
*/
function stt_extended_stop()
{
	if(mode === "extended")
	{
		stt_extended.kill();
		stt_extended = null;
		mode = "off";
	} else { console.log("Extended stt not running."); }
}

/**
* Inits the ears and starts basic listening
*
* @method log
* @param {Function} successCallback Function callback when init succeeds
* @param {Function} errorCallback Function callback when init fails
*/
function init(successCallback, errorCallback)
{
	initCallback = successCallback;
	initErrorCallback = errorCallback;
	try
	{
		stt_basic_start();
	} catch(error)
	{
		errorCallback();
	}
}

/* Exports */
exports.init = init;

/* Globals */
global.robin.ears = {};
global.robin.ears.stt_mode = mode;
global.robin.ears.stt_basic_start = stt_basic_start;
global.robin.ears.stt_basic_stop = stt_basic_stop;
global.robin.ears.stt_extended_start = stt_extended_start;
global.robin.ears.stt_extended_stop = stt_extended_stop;
