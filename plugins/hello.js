/* globals exports, require, global */

var dateFormat = require('dateformat');

function hello()
{
	var now = new Date();
	var daytime = dateFormat(now, "H") < 12 ? "Good morning" : dateFormat(now, "H") < 18 ? "Good afternoon" : "Good evening";
	global.robin.mouth.say(daytime);
}

function goodbye()
{
	var now = new Date();
	var answers = ["See you later", "Bye bye", "See you later, aligator", "Goodbye"];
	var hour = dateFormat(now, "H");

	if(hour < 12) { global.robin.mouth.say("Have a good day"); }
	else if(hour < 23) { global.robin.mouth.say(answers[Math.floor(Math.random()*answers.length)]); }
	else { global.robin.mouth.say("Sleep well"); }
}

function greet(cmd)
{
	global.robin.mouth.say("Hello " + cmd[1] + ", my name is " + global.robin.settings.name);
    global.robin.mouth.say("Are you doing ok today?", function() {
		exports.requestNextExtendedInput(doingOk);
    });
}

function doingOk(cmd)
{
    var result = exports.plugins.acknowledge.check(cmd);
    if (result === 0){ global.robin.mouth.say("I'm sorry to hear that."); } // TODO: Tell joke
    else if(result === 1){ global.robin.mouth.say("Great"); }
    else { exports.plugins.disappoint.didNotUnderstand(); }
}

function hallo()
{
	var now = new Date();
	var daytime = dateFormat(now, "H") < 12 ? "Goede morgen" : dateFormat(now, "H") < 18 ? "Goede middag" : "Goede avond";
	global.robin.mouth.say(daytime);
}

function totziens()
{
	var now = new Date();
	var answers = ["Zie je later", "Bye bye", "Tot ziens", "Laters"];
	var hour = dateFormat(now, "H");

	if(hour < 12) { global.robin.mouth.say("Fijne dag"); }
	else if(hour < 23) { global.robin.mouth.say(answers[Math.floor(Math.random()*answers.length)]); }
	else { global.robin.mouth.say("Slaap lekker"); }
}

function groet(cmd)
{
	global.robin.mouth.say("Hallo " + cmd[1] + ", mijn naam is " + global.robin.settings.name);
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
exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"I AM (\\w+)", callback:greet},
	{command:"MY NAME IS (\\w+)", callback:greet}
];

exports.basicCommands['nl-NL'] =
[
	{command:"HALLO", callback:hallo},
	{command:"TOT ZIENS", callback:totziens},
	{command:"GOEDE AVOND", callback:hallo},
	{command:"GOEDE MORGEN", callback:hallo},
	{command:"HOI", callback:hallo}
];
exports.extendedCommands['nl-NL'] =
[
	{command:"IK BEN (\\w+)", callback:groet},
	{command:"MIJN NAAM IS (\\w+)", callback:groet}
];
