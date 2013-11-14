/* globals exports, require */

var dateFormat = require('dateformat');

function hello()
{
	var now = new Date();
	var daytime = dateFormat(now, "H") < 12 ? "Good morning" : dateFormat(now, "H") < 18 ? "Good afternoon" : "Good evening";
	exports.say(daytime);
}

function goodbye()
{
	var now = new Date();
	var answers = ["See you later", "Bye bye", "See you later, aligator", "Goodbye"];
	var hour = dateFormat(now, "H");

	if(hour < 12) { exports.say("Have a good day"); }
	else if(hour < 23) { exports.say(answers[Math.floor(Math.random()*answers.length)]); }
	else { exports.say("Sleep well"); }
}

function hallo()
{
	var now = new Date();
	var daytime = dateFormat(now, "H") < 12 ? "Goede morgen" : dateFormat(now, "H") < 18 ? "Goede middag" : "Goede avond";
	exports.say(daytime);
}

function totziens()
{
	var now = new Date();
	var answers = ["Zie je later", "Bye bye", "Tot ziens", "Laters"];
	var hour = dateFormat(now, "H");

	if(hour < 12) { exports.say("Fijne dag"); }
	else if(hour < 23) { exports.say(answers[Math.floor(Math.random()*answers.length)]); }
	else { exports.say("Slaap lekker"); }
}

exports.basicCommands = [];
exports.basicCommands['en-US'] =
[
	{command:"HELLO", callback:hello},
	{command:"GOODBYE", callback:goodbye},
	{command:"GOOD EVENING", callback:hello},
	{command:"GOOD MORNING", callback:hello},
	{command:"GOOD DAY", callback:hello},
	{command:"SEE YOU", callback:goodbye}
];

exports.basicCommands['nl-NL'] =
[
	{command:"HALLO", callback:hallo},
	{command:"TOT ZIENS", callback:totziens},
	{command:"GOEDE AVOND", callback:hallo},
	{command:"GOEDE MORGEN", callback:hallo},
	{command:"HOI", callback:hallo}
];
