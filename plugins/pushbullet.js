/* globals exports, require, global */

var PushBullet = require('pushbullet');
var pusher;
function test()
{
	if(!pusher){ pusher = new PushBullet(exports.settings.api); }
	pusher.note(exports.settings.device, "Test pushbullet from Robin", "This is a test pushbullet message.", function()
	{
		// response is the JSON response from the API
	});
}

function address()
{
	var os = require('os');
	var ifaces = os.networkInterfaces();
	var ip = "";
	for (var dev in ifaces)
	{
		ifaces[dev].forEach(function(details) { if (details.family=='IPv4' && dev !== 'lo') { ip = details.address; } });
	}

	if(!pusher){ pusher = new PushBullet(exports.settings.api); }
	pusher.link(exports.settings.device, "Robin", "http://" + ip + ":3141", function()
	{
		global.robin.mouth.say("The file has been pushed to your device");
	});
}

function file(path)
{
	if(!pusher){ pusher = new PushBullet(exports.settings.api); }
	pusher.file(exports.settings.device, path, function()
	{
		global.robin.mouth.say("The file has been pushed to your device");
	});
}

function note(title, message)
{
	if(!pusher){ pusher = new PushBullet(exports.settings.api); }
	pusher.note(exports.settings.device, title, message, function()
	{
		global.robin.mouth.say("The note has been pushed to your device");
	});
}

function list(title, listArray)
{
	if(!pusher){ pusher = new PushBullet(exports.settings.api); }
	pusher.list(exports.settings.device, title, listArray, function()
	{
		global.robin.mouth.say("The list has been pushed to your device");
	});
}

function link(title, linkString)
{
	if(!pusher){ pusher = new PushBullet(exports.settings.api); }
	pusher.link(exports.settings.device, title, linkString, function()
	{
		global.robin.mouth.say("The link has been pushed to your device");
	});
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"TEST PUSHBULLET", callback:test},
	{command:"SEND ME YOUR ADDRESS", callback:address}
];

exports.extendedCommands['nl-NL'] =
[
	{command:"TEST PUSHBULLET", callback:test},
	{command:"STUUR MIJ JOUW ADRES", callback:address}
];

exports.file = file;
exports.note = note;
exports.list = list;
exports.link = link;
