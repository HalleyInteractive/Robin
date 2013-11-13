var dateFormat = require('dateformat');

function time(cmd)
{
	console.log("Running the time callback");
	var now = new Date();
	exports.say("The time is " + dateFormat(now, "h:MM") + " and " + dateFormat(now, "ss") + " seconds");
}

function date(cmd)
{
	console.log("Running the date callback");
	var now = new Date();
	exports.say("Today is " + dateFormat(now, "fullDate"));
}

exports.extendedCommand =
[
	{command:"WHAT TIME IS IT", callback:time},
	{command:"WHAT IS THE TIME", callback:time},
	{command:"HOW LATE IS IT", callback:time},
	{command:"WHAT DATE IS IT", callback:date},
	{command:"WHAT IS THE DATE", callback:date},
	{command:"WHICH DATE IS IT", callback:date},
	{command:"CAN YOU TELL ME THE TIME", callback:time},
	{command:"DO YOU KNOW WHAT TIME IT IS", callback:time},
	{command:"DO YOU KNOW THE TIME", callback:time}
];
