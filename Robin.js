/* globals require */
var ears = require('./RobinEars.js');
var mouth = require('./RobinMouth.js');
var brain = require('./RobinBrain.js');
var eyes = require('./RobinEyes.js');
var config = require('./RobinConfig.js');

ears.basiccmd = runBasicCommand;
ears.extendedcmd = runExtendedCommand;
ears.robin = config.robin;
ears.stt_basic_start();
ears.brain = brain.brain;

mouth.robin = config.robin;
mouth.brain = brain.brain;

// TODO: Make a backend. include tty.js
// TODO: Convert written digits to digits
// TODO: Write documentation

var words = [];
var requestedNextExtendedInput = undefined;
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
    disappoint: require('./plugins/disappoint'),
    acknowledge: require('./plugins/acknowledge'),
    selfie: require('./plugins/selfie')
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

    plugins[plugin].plugins = plugins;
	plugins[plugin].say = mouth.say;
	plugins[plugin].ears = ears;
    plugins[plugin].eyes = eyes;
	plugins[plugin].robin = config.robin;
    plugins[plugin].requestNextExtendedInput = requestNextExtendedInput;
}

function requestNextExtendedInput(callback)
{
    console.log("Getting ready for next input");
    requestedNextExtendedInput = callback;
    ears.stt_basic_stop();
	ears.stt_extended_start();
}

function listenForExtendedCommand(cmd)
{
    var feedback = ["yes", "What's up", "What can I do for you"];
	mouth.say(feedback[Math.floor(Math.random()*feedback.length)]);
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
    var foundMatch = false;
	for(var i = 0; i < registeredBasicCommands[config.robin.language].length; i++)
	{
		var match = cmd.match(registeredBasicCommands[config.robin.language][i].command);
		if(match)
		{
			console.log("Found a registered command");
            foundMatch = true;
			registeredBasicCommands[config.robin.language][i].callback(match);
		}
	}
    if(!foundMatch){ plugins.disappoint.didNotUnderstand(); }
}

function runExtendedCommand(cmd)
{
    if(requestedNextExtendedInput === null || requestedNextExtendedInput === undefined)
    {
         var foundMatch = false;
        for(var i = 0; i < registeredExtendedCommands[config.robin.language].length; i++)
        {
            var match = cmd.match(registeredExtendedCommands[config.robin.language][i].command);
            if(match)
            {
                console.log("Found a extended registered command");
                foundMatch = true;
                registeredExtendedCommands[config.robin.language][i].callback(match);
                if(registeredExtendedCommands[config.robin.language][i].save !== false)
                {
                    config.lastCommand = registeredExtendedCommands[config.robin.language][i];
                }
            }
        }
        if(!foundMatch){ plugins.disappoint.didNotUnderstand(); }
	} else
    {
        requestedNextExtendedInput(cmd);
        requestedNextExtendedInput = null;
    }
}
