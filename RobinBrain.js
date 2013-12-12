var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/robin', function(err, db)
{
	if(err) throw err;
	exports.brain.collection = collection = db.collection('voice');
	console.log("Connected to the brain");
})

exports.brain = {};
exports.brain.db = MongoClient;

