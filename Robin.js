/* globals require, __dirname, process, global */

/*
* Robin.js
* All Robin components.
*/

/* Create global robin variable */
global.robin = {};

/**
* Assign global robin functions
*
* @global
* @param {Function} robin.requestNextExtendedInput
* @param {Function} robin.runBasicCommand
* @param {Function} robin.runExtendedCommand
*/
global.robin.requestNextExtendedInput = requestNextExtendedInput;
global.robin.runBasicCommand = runBasicCommand;
global.robin.runExtendedCommand = runExtendedCommand;

/**
* A list with the included plugins.
* Here you can access the plugins
*
* @global
* @param {Object} robin.plugins
*/
global.robin.plugins = {};

/** A list of all the information on the plugins.
* @param {String} robin.pluginlist.name
* @param {String} robin.pluginlist.description
* @param {String} robin.pluginlist.path
* @param {String} robin.pluginlist.version
*/
global.robin.pluginlist = {};

/* Include filesystem */
var fs = require('fs');

/* RobinEars handles the voice input. */
var ears = require('./RobinEars.js');

/* RobinMouth handles speaking. */
var mouth = require('./RobinMouth.js');

/* RobinBrain holds the connection to the database */
var brain = require('./RobinBrain.js');

/* RobinEyes controls the camera */
//var eyes = require('./RobinEyes.js');

/* RobinServer starts a server that can be accessed from a remote computer */
var server = require('./RobinServer.js');

/* When set the next extended input will be routed to this function */
var requestedNextExtendedInput;

/* Holds all he registered basic commands */
var registeredBasicCommands = [];

/* Holds all the registered extended commands */
var registeredExtendedCommands = [];

/*
* Call init on the brain
* Load plugins after settings are loaded
*/
brain.init(function()
{
	console.log("Brain started");
	console.log(global.robin.settings);

	ears.init(function()
	{
		console.log("Ears started");
	}, function(){ console.log("Error starting ears"); });

	routeLogsToServer();
	loadPlugins();

}, function(){ console.log("Error starting brain"); });



/**
* Route all logs through RobinServer
*/
function routeLogsToServer()
{
	console.defaultLog = console.log;
	console.log = function(log)
	{
		console.defaultLog(log);
		global.robin.server.log(log);
	};
}

/**
* Reads plugins json file and loads the plugins to plugins variable
*/
function loadPlugins()
{
	fs.readFile(__dirname + '/plugins/plugins.json', 'utf8', function (err, data)
	{
		if (err) { console.log('Error: ' + err); return; }
		global.robin.pluginlist = JSON.parse(data);
		for(var plugin in global.robin.pluginlist)
		{
			global.robin.plugins[plugin] = require(global.robin.pluginlist[plugin].path);
		}
		registerCommands();
	});
}


/**
* Adds all the commands listed in the plugins to the registered commands list.
* @method registerCommands
*/
function registerCommands()
{
	var languages = [];
	for(var plugin in global.robin.plugins)
	{
		var language;
		for(language in global.robin.plugins[plugin].basicCommands)
		{
			languages.push(language);
			if(!registeredBasicCommands[language]){ registeredBasicCommands[language] = []; }
			registeredBasicCommands[language] = registeredBasicCommands[language].concat(global.robin.plugins[plugin].basicCommands[language]);
		}

		for(language in global.robin.plugins[plugin].extendedCommands)
		{
			languages.push(language);
			if(!registeredExtendedCommands[language]){ registeredExtendedCommands[language] = []; }
			registeredExtendedCommands[language] = registeredExtendedCommands[language].concat(global.robin.plugins[plugin].extendedCommands[language]);
		}
	}

	global.robin.languages = languages.concat();
    for(var i = 0; i < global.robin.languages.length; ++i)
	{
        for(var j=i+1; j<global.robin.languages.length; ++j)
		{
            if(global.robin.languages[i] === global.robin.languages[j])
			{
                global.robin.languages.splice(j--, 1);
			}
        }
    }

	/* Add Robins name to the basic commands */
	for(var lang in registeredBasicCommands)
	{
		registeredBasicCommands[lang] = registeredBasicCommands[lang].concat([{command:global.robin.settings.name.toUpperCase(), callback:listenForExtendedCommand}]);
	}

	/* Create a corpus file **/
	var stream = fs.createWriteStream("Dictionary/Robin.corpus");
	stream.once('open', function()
	{
		for(var i = 0; i < registeredBasicCommands[global.robin.settings.language].length; i++)
		{
			var command = registeredBasicCommands[global.robin.settings.language][i].command.replace(/[^A-Za-z0-9_\s]/g, "");
			stream.write(command + "\n");
		}

		stream.end();
	});
}

/**
* With this method you can directly request the next voice input.
* The requested input doens't need to be registered and will not be checked for other registered commands.
*
* @global
* @method requestNextExtendedInput
* @param {Function} Callback for the next input. Will be called with a cmd parameter.
*/
function requestNextExtendedInput(callback)
{
    requestedNextExtendedInput = callback;
    global.robin.ears.stt_basic_stop();
	global.robgin.ears.stt_extended_start();
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
	global.robin.mouth.say(feedback[Math.floor(Math.random()*feedback.length)]);
    global.robin.ears.stt_basic_stop();
	global.robin.ears.stt_extended_start();
}

/**
* Checks if the given string is matching any of the registered basic commands
*
* @global
* @method runBasicCommand
* @param {String} cmd
*/
function runBasicCommand(cmd)
{
    var foundMatch = false;
	for(var i = 0; i < registeredBasicCommands[global.robin.settings.language].length; i++)
	{
		var match = cmd.match(registeredBasicCommands[global.robin.settings.language][i].command);
		if(match)
		{
			console.log("Found a registered command");
            foundMatch = true;
			registeredBasicCommands[global.robin.settings.language][i].callback(match);
		}
	}
    if(!foundMatch){ global.robin.plugins.disappoint.didNotUnderstand(); }
}

/**
* Checks if the given string is matching any of the registered extended commands
*
* @global
* @method runExtendedCommand
* @param {String} cmd
*/
function runExtendedCommand(cmd)
{
    if(requestedNextExtendedInput === null || requestedNextExtendedInput === undefined)
    {
        var foundMatch = false;
		cmd = convertToDigits(cmd);
        for(var i = 0; i < registeredExtendedCommands[global.robin.settings.language].length; i++)
        {
            var match = cmd.match(registeredExtendedCommands[global.robin.settings.language][i].command);
            if(match)
            {
                console.log("Found a extended registered command");
                foundMatch = true;
                registeredExtendedCommands[global.robin.settings.language][i].callback(match);
                if(registeredExtendedCommands[global.robin.settings.language][i].save !== false)
                {
                    global.robin.brain.lastCommand = registeredExtendedCommands[global.robin.settings.language][i];
                }
            }
        }
        if(!foundMatch){ global.robin.plugins.disappoint.didNotUnderstand(); }
	} else
    {
        requestedNextExtendedInput(cmd);
        requestedNextExtendedInput = null;
    }
}

/**
* Converts all digits 1,2,3... to written digits one,two,three...
*
* @method convertToDigits
* @param {String} input
*/
function convertToDigits(input)
{
	var digits =
	[
		{text:"one", number:1},
		{text:"two", number:2},
		{text:"three", number:3},
		{text:"four", number:4},
		{text:"five", number:5},
		{text:"six", number:6},
		{text:"seven", number:7},
		{text:"eight", number:8},
		{text:"nine", number:9},
		{text:"zero", number:0},
		{text:"null", number:0}
	];

	for(var i = 0; i < digits.length; i++)
	{
		var reg = new RegExp(digits[i].text, "gi");
		input = input.replace(reg, digits[i].number);
	}

	return input;

}

/*
* Catch exits and do stuff before exiting robin
*/
process.stdin.resume(); // So the program will not close instantly
process.on('exit', function ()
{
	console.log("Clean up before exit");
	try { eyes.exit(); } catch(error){}
    try { brain.exit(); } catch(error){}
	try { global.robin.ears.stt_basic_stop(); } catch(error){}
	try { global.robin.ears.stt_extended_stop(); } catch(error){}
});

// Catches ctrl+c event
process.on('SIGINT', function ()
{
    process.exit();
});

//catches uncaught exceptions
process.on('uncaughtException',function(e)
{
    console.log(e.stack);
    process.exit();
});
