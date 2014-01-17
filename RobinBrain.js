/* globals exports, require */

/*
* RobinBrain.js
* Sets up the connection to the MongoDB
*/

/* MongoClient */
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/robin', function(err, db)
{
	if(err) { throw err; }
	exports.brain.db = db;
	exports.brain.collection = db.collection('voice');
	console.log("Connected to the brain");
});

/* Module exports */
exports.brain = {};
exports.exit = function()
{
	/* Clean up open connection */
	exports.brain.db.close();
};
