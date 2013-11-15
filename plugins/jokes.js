/* globals exports, require */

function joke()
{
	var http = require("http");
	var options = {host: 'api.icndb.com', port: 80, path: '/jokes/random?limitTo=[nerdy]'};

	http.get(options, function(res)
	{
		console.log("Got response: " + res.statusCode);
		res.setEncoding('utf8');
		res.on('data', function (chunk)
		{
			var joke = JSON.parse(chunk);
			exports.say("Sure");
			exports.say(joke.value.joke);
		});
	}).on('error', function(e)
	{
		console.log("Got error: " + e.message);
	});
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"KNOW A JOKE", callback:joke},
	{command:"KNOW A GOOD ONE", callback:joke},
	{command:"CHUCK NORRIS", callback:joke},
	{command:"TELL ME A JOKE", callback:joke},
];
