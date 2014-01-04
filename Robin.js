/* globals require */

/*
* Robin.js
* All Robin components.
*/

/* Include filesystem */
var fs = require('fs');

/* RobinEars handles the voice input. */
var ears = require('./RobinEars.js');
/* RobinMouth handles speaking. */
var mouth = require('./RobinMouth.js');
/* RobinBrain holds the connection to the database */
var brain = require('./RobinBrain.js');
/* RobinEyes controls the camera */
var eyes = require('./RobinEyes.js');
/* RobinConfig contains some configureation */
var config = require('./RobinConfig.js');
/* RobinServer starts a server that can be accessed from a remote computer */
var server = require('./RobinServer.js');

/* When set the next extended input will be routed to this function */
var requestedNextExtendedInput;

/* Holds all he registered basic commands */
var registeredBasicCommands = [];

/* Holds all the registered extended commands */
var registeredExtendedCommands = [];

/* A list of all plugins that are included */
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
    selfie: require('./plugins/selfie'),
	timer: require('./plugins/timer')
};

/* Configure ear variables */
ears.basiccmd = runBasicCommand;
ears.extendedcmd = runExtendedCommand;
ears.robin = config.robin;
ears.stt_basic_start();
ears.brain = brain.brain;
ears.plugins = plugins;

/* Configure mouth variables */
mouth.robin = config.robin;
mouth.brain = brain.brain;

/* Configure server variables */
server.basiccmd = runBasicCommand;
server.extendedcmd = runExtendedCommand;
server.robin = config.robin;

/* Configure eye variables  */
eyes.server = server;

/* Route all logs through RobinServer */
console.defaultLog = console.log;
console.log = function(log)
{
	console.defaultLog(log);
	server.log(log);
};

/* Load plugins */
for(var plugin in plugins)
{
	for(var language in plugins[plugin].basicCommands)
	{
		if(!registeredBasicCommands[language]){ registeredBasicCommands[language] = []; }
		registeredBasicCommands[language] = registeredBasicCommands[language].concat(plugins[plugin].basicCommands[language]);
	}

	for(var language in plugins[plugin].extendedCommands)
	{
		if(!registeredExtendedCommands[language]){ registeredExtendedCommands[language] = []; }
		registeredExtendedCommands[language] = registeredExtendedCommands[language].concat(plugins[plugin].extendedCommands[language]);
	}

    plugins[plugin].plugins = plugins;
	plugins[plugin].say = mouth.say;
	plugins[plugin].ears = ears;
    plugins[plugin].eyes = eyes;
	plugins[plugin].robin = config.robin;
    plugins[plugin].requestNextExtendedInput = requestNextExtendedInput;
}

/* Create a corpus file **/
var stream = fs.createWriteStream("Dictionary/Robin.corpus");
stream.once('open', function()
{
	for(var i = 0; i < registeredBasicCommands[config.robin.language].length; i++)
	{
		var command = registeredBasicCommands[config.robin.language][i].command.replace(/[^A-Za-z0-9_\s]/g, "");
		stream.write(command + "\n");
	}

	stream.end();
});

/* Add Robins name to the basic commands */
for(var language in registeredBasicCommands)
{
	registeredBasicCommands[language] = registeredBasicCommands[language].concat([{command:config.robin.name.toUpperCase(), callback:listenForExtendedCommand}]);
}

/**
* With this method you can directly request the next voice input.
* The requested input doens't need to be registered and will not be checked for other registered commands.
*
* @method requestNextExtendedInput
* @param {Function} Callback for the next input. Will be called with a cmd parameter.
*/
function requestNextExtendedInput(callback)
{
    console.log("Getting ready for next input");
    requestedNextExtendedInput = callback;
    ears.stt_basic_stop();
	ears.stt_extended_start();
}

/**
* Starts RobinVoice Extended voice input.
* It's triggered by calling Robins name.
*
* @method listenForExtendedCommand
* @param {Function} cmd
*/
function listenForExtendedCommand(cmd)
{
    var feedback = ["yes", "What's up", "What can I do for you"];
	mouth.say(feedback[Math.floor(Math.random()*feedback.length)]);
    ears.stt_basic_stop();
	ears.stt_extended_start();
}

/**
* Checks if the given string is matching any of the registered basic commands
*
* @method runBasicCommand
* @param {String} cmd
*/
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

/**
* Checks if the given string is matching any of the registered extended commands
*
* @method runExtendedCommand
* @param {String} cmd
*/
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
