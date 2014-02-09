/* globals exports, require */

/*
* RobinBrain.js
* Sets up the connection to the MongoDB
*/

var arango = require('arango');
var db = arango.Connection("http://127.0.0.1:8529",{_name:"Robin"});
exports.brain = {};
exports.brain.db = db;
exports.exit = function()
{

};

global.reloadSettings = function()
{
	console.log("Settings changed, reload");
	global.config.init();
}
