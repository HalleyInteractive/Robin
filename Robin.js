/* globals require */

var ears = require('./RobinEars.js');
var mouth = require('./RobinMouth.js');

ears.cmd = function (cmd) { runCommand(cmd); };

var Robin =
{
	name: "Robin",
	lastCommand:{}
};

var registeredCommands = [];
var plugins =
{
	polite: require('./plugins/polite'),
	timedate: require('./plugins/timedate'),
	repeat: require('./plugins/repeat'),
	jokes: require('./plugins/jokes')
};

for(var plugin in plugins)
{
	registeredCommands = registeredCommands.concat(plugins[plugin].commands);
	plugins[plugin].say = mouth.say;
	plugins[plugin].robin = Robin;
}


/** Create a corpus file **/
var fs = require('fs');
var stream = fs.createWriteStream("Dictionary/corpus");
stream.once('open', function()
{
	for(var i = 0; i < registeredCommands.length; i++)
	{
		stream.write(registeredCommands[i].command.toUpperCase() + "\n");
	}
	stream.end();
});

function runCommand(cmd)
{

	for(var i = 0; i < registeredCommands.length; i++)
	{
		if(registeredCommands[i].command === cmd)
		{
			console.log("Found a registered command");
			registeredCommands[i].callback(cmd);
			if(registeredCommands[i].save !== false)
			{
				console.log("Register command in last command");
				Robin.lastCommand = registeredCommands[i];
			}
		}
	}
}
