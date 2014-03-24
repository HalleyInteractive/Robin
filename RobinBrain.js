/* globals exports, require */

/*
* RobinBrain.js
* Sets up the connection to the MongoDB
*/

/*
* ArangoDB javascript client
* Author: Kaerus
* Github: https://github.com/kaerus-component/arango
*/
var arango = require('arango');

/*
* Connect to the local database named Robin
* @global
*/
var db = arango.Connection("http://127.0.0.1:8529",{_name:"Robin"});

/**
* Contains the settings for Robin
* @global
* @param String name Name that Robin should listen to
* @param String language Language is used to convert text to speech and speech recognition
* @param String version Version of Robin
* @param Object lastCommand last command is saved here for reuse.
* @param String audiodevice Id of the audiorecording device
*/
var Robin =
{
	name: "Lisa",
	language: "en-US",
	version: '0.0.1',
	lastCommand:{},
	audiodevice:'1',
	corpusHash:''
};

/**
* Executes the initial query for the settings.
* On first start it will create this entry in the database
*/
function init(successCallback, errorCallback)
{
	db.query.exec("FOR s in Settings LIMIT 1 RETURN s", function(err, ret)
	{
		if(err || ret.result.length === 0)
		{
			db.document.create('Settings', Robin).then(function(res)
			{
				console.log("Created initial database settings entry");
				if(successCallback !== null) { successCallback(); }
			},function(err)
			{
				console.log("Error creating initial database settings entry");
				if(errorCallback !== null) { errorCallback(); }
			});
		} else
		{
			global.robin.settings = ret.result[0];
			if(successCallback !== null) { successCallback(); }
		}
	});
}

/**
* Does a query to reload the settings from the database
*
* @global
* @method reloadSettings
*/
function reloadSettings(callback)
{
	console.log("Settings changed, reload");
	init(callback);
}

/**
* Sends settings to the database.
* Settings are stored in global.robin.settings
*
* @global
* @method saveSettings
*/
function saveSettings()
{
	db.document.put(global.robin.settings._id, global.robin.settings);
	console.log("Settings updated");
}


/* Exports */
exports.init = init;
exports.exit = function()
{
	// TODO: Need to close the connection?
};

/* Globals */
global.robin.brain = {};
global.robin.brain.db = db;
global.robin.settings = Robin;
global.robin.brain.reloadSettings = reloadSettings;
global.robin.brain.saveSettings = saveSettings;
