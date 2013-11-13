var dateFormat = require('dateformat');

function hello(cmd)
{
	var now = new Date();
	var daytime = dateFormat(now, "H") < 12 ? "Good morning" : dateFormat(now, "H") < 18 ? "Good afternoon" : "Good evening";
	exports.say(daytime);

}

function goodbye(cmd)
{
	var now = new Date();
	var answers = ["See you later", "Bye bye", "See you later, aligator", "Goodbye"];
	var hour = dateFormat(now, "H");

	if(hour < 12)
	{
		exports.say("Have a good day");
	} else if(hour < 23)
	{
		exports.say(answers[Math.floor(Math.random()*answers.length)]);
	} else
	{
		exports.say("Sleep well");
	}
}

exports.basicCommands =
[
	{command:"HELLO", callback:hello},
	{command:"GOODBYE", callback:goodbye},
	{command:"GOOD EVENING", callback:hello},
	{command:"GOOD MORNING", callback:hello},
	{command:"GOOD DAY", callback:hello},
	{command:"SEE YOU", callback:goodbye}
];
