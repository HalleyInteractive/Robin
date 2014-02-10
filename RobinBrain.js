/* globals exports, require */

/*
* RobinBrain.js
* Sets up the connection to the MongoDB
*/



var arango = require('arango');
var db = arango.Connection("http://127.0.0.1:8529",{_name:"Robin"});

/**
* Contains the settings for Robin
* @param String name Name that Robin should listen to
* @param String language Language is used to convert text to speech and speech recognition
* @param String Version of Robin
* @param Object lastCommand last command is saved here for reuse.
*/
var Robin =
{
	name: "Lisa",
	language: "en-US",
	version: '0.0.1',
	lastCommand:{},
	audiodevice:'1'
};

function init(successCallback, errorCallback)
{
	db.query.exec("FOR s in Settings LIMIT 1 RETURN s", function(err, ret)
	{
		if(err || ret.result.length === 0)
		{
			db.document.create('Settings', Robin).then(function(res)
			{
				console.log("Created database config entry: %j", res);
				if(successCallback !== null) { successCallback(); }
			},function(err)
			{
				console.log("Error creating database config entry: %j", err);
				if(errorCallback !== null) { errorCallback(); }
			});
		} else
		{
			global.robin.settings = ret.result[0];
			if(successCallback !== null) { successCallback(); }
		}
	});
}

global.robin.brain = {};

/* Make init function available */
exports.init = init;

/* Make db variable available */
global.robin.brain.db = db;

/* Make settings available */
global.robin.settings = Robin;

/* Make reload settings function available */
global.robin.brain.reloadSettings = function()
{
	console.log("Settings changed, reload");
	init();
};

/* Export exit function */
exports.exit = function()
{
	// TODO: Need to close the connection?
};
