/* globals require */

var ears = require('./RobinEars.js');
var mouth = require('./RobinMouth.js');
var config = require('./RobinConfig.js');

ears.basiccmd = function (cmd) { runBasicCommand(cmd); };
ears.extendedcmd = function (cmd) { runExtendedCommand(cmd); };
ears.robin = config.robin;
ears.stt_basic_start();



mouth.robin = config.robin;

// TODO: Check if it's needed to start redis?
// TODO: Let plugins receive all next input on request.
// TODO: Make a backend. include tty.js
// TODO: Convert written digits to digits

var words = [];

var registeredBasicCommands = [];
var registeredExtendedCommands = [];
var plugins =
{
	polite: require('./plugins/polite'),
	timedate: require('./plugins/timedate'),
	repeat: require('./plugins/repeat'),
	jokes: require('./plugins/jokes'),
	hello: require('./plugins/hello'),
	calculate: require('./plugins/calculate'),
	extendedinput: require('./plugins/extendedinput'),
};

for(var plugin in plugins)
{
	if(plugins[plugin].basicCommands !== undefined) { registeredBasicCommands = registeredBasicCommands.concat(plugins[plugin].basicCommands); }
	if(plugins[plugin].extendedCommands !== undefined) { registeredExtendedCommands = registeredExtendedCommands.concat(plugins[plugin].extendedCommands); }
	plugins[plugin].say = mouth.say;
	plugins[plugin].robin = config.robin;
	plugins[plugin].ears = ears;
}

/** Create a corpus file **/
var fs = require('fs');
var stream = fs.createWriteStream("Dictionary/corpus");
stream.once('open', function()
{
	for(var w = 0; w < words.length; w++)
	{
		stream.write(words[w] + "\n");
	}

	for(var i = 0; i < registeredBasicCommands.length; i++)
	{
		var command = registeredBasicCommands[i].command.replace(/[^A-Za-z0-9_\s]/g, "");
		stream.write(command + "\n");
	}

	stream.end();
});

function runBasicCommand(cmd)
{
	for(var i = 0; i < registeredBasicCommands.length; i++)
	{
		var match = cmd.match(registeredBasicCommands[i].command);
		if(match)
		{
			console.log("Found a registered command");
			registeredBasicCommands[i].callback(match);
		}
	}
}

function runExtendedCommand(cmd)
{
	for(var i = 0; i < registeredExtendedCommands.length; i++)
	{
		var match = cmd.match(registeredExtendedCommands[i].command);
		if(match)
		{
			console.log("Found a extended registered command");
			registeredExtendedCommands[i].callback(match);
			if(registeredExtendedCommands[i].save !== false)
			{
				config.lastCommand = registeredExtendedCommands[i];
			}
		}
		//TODO: When nothing is found, let down
	}
}
