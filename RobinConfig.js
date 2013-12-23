/* globals exports */

/**
* Contains the settings for Robin
* @param String name Name that Robin should listen to
* @param String language Language is used to convert text to speech and speech recognition
* @param Object lastCommand last command is saved here for reuse.
*/
var Robin =
{
	name: "James",
	language: "en-US",
	lastCommand:{}
};

/* Export Robin to robin */
exports.robin = Robin;
