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
// TODO: Write documentation

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
	calculate: require('./plugins/calculate')
};

for(var plugin in plugins)
{
	for(var language in plugins[plugin].basicCommands)
	{
		if(!registeredBasicCommands[language]){ registeredBasicCommands[language] = new Array(); }
		registeredBasicCommands[language] = registeredBasicCommands[language].concat(plugins[plugin].basicCommands[language]);
	}

	for(var language in plugins[plugin].extendedCommands)
	{
		if(!registeredExtendedCommands[language]){ registeredExtendedCommands[language] = new Array(); }
		registeredExtendedCommands[language] = registeredExtendedCommands[language].concat(plugins[plugin].extendedCommands[language]);
	}

	plugins[plugin].say = mouth.say;
	plugins[plugin].robin = config.robin;
	plugins[plugin].ears = ears;
}

function listenForExtendedCommand(cmd)
{
	mouth.say("yes");
	ears.stt_basic_stop();
	ears.stt_extended_start();
}

for(var language in registeredBasicCommands)
{
	registeredBasicCommands[language] = registeredBasicCommands[language].concat([{command:config.robin.name.toUpperCase(), callback:listenForExtendedCommand}]);
}


/** Create a corpus file **/
var fs = require('fs');
var stream = fs.createWriteStream("Dictionary/Robin.corpus");
stream.once('open', function()
{
	for(var w = 0; w < words.length; w++)
	{
		stream.write(words[w] + "\n");
	}

	for(var i = 0; i < registeredBasicCommands[config.robin.language].length; i++)
	{
		var command = registeredBasicCommands[config.robin.language][i].command.replace(/[^A-Za-z0-9_\s]/g, "");
		stream.write(command + "\n");
	}

	stream.end();
});

function runBasicCommand(cmd)
{
	for(var i = 0; i < registeredBasicCommands[config.robin.language].length; i++)
	{
		var match = cmd.match(registeredBasicCommands[config.robin.language][i].command);
		if(match)
		{
			console.log("Found a registered command");
			registeredBasicCommands[config.robin.language][i].callback(match);
		}
	}
}

function runExtendedCommand(cmd)
{
	for(var i = 0; i < registeredExtendedCommands[config.robin.language].length; i++)
	{
		var match = cmd.match(registeredExtendedCommands[config.robin.language][i].command);
		if(match)
		{
			console.log("Found a extended registered command");
			registeredExtendedCommands[config.robin.language][i].callback(match);
			if(registeredExtendedCommands[config.robin.language][i].save !== false)
			{
				config.lastCommand = registeredExtendedCommands[config.robin.language][i];
			}
		}
		//TODO: When nothing is found, let down
	}
}
