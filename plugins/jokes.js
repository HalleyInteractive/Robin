/* globals exports, require */

function joke()
{
	var http = require("http");
	var category = exports.settings.chucknorris.categories !== null ? 'limitTo=[' + exports.settings.chucknorris.catagories + ']' : 'limitTo=';
	var firstname = exports.settings.chucknorris.firstname !== null ? '&firstName=' + exports.settings.chucknorris.firstname : '';
	var lastname = exports.settings.chucknorris.lastname !== null ? '&lastName=' + exports.settings.chucknorris.lastname : '';
	var options = {host: 'api.icndb.com', port: 80, path: '/jokes/random?' + category + firstname + lastname};

	http.get(options, function(res)
	{
		console.log("Got response: " + res.statusCode);
		res.setEncoding('utf8');
		res.on('data', function (chunk)
		{
			var joke = JSON.parse(chunk);
			global.robin.mouth.say("Sure");
			global.robin.mouth.say(joke.value.joke, null, false);
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
	{command:"TELL A JOKE", callback:joke}
];
