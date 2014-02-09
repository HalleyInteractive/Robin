/* globals exports, global */

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

function init()
{
	exports.brain.db.query.exec("FOR s in Settings LIMIT 1 RETURN s", function(err, ret)
	{
		if(err || ret.result.length === 0)
		{
			exports.brain.db.document.create('Settings', Robin).then(function(res)
			{
				console.log("Created database config entry: %j", res);
			},function(err)
			{
				console.log("Error creating database config entry: %j", err);
			});
		} else
		{
			global.robin = ret.result[0];
		}
	});
}

global.config = {};

/* Export init function */
exports.init = init;
global.config.init = init;

/* Global Robin to robin */
global.robin = Robin;
