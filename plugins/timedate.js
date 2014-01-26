/* globals exports, require */

var dateFormat = require('dateformat');

function time()
{
	console.log("Running the time callback");
	var now = new Date();
	if(global.robin.language === 'nl-NL') {
		exports.say("Het is nu " + dateFormat(now, "h uur MM minten en ss") + " seconden", null, false);
	} else { exports.say("The time is " + dateFormat(now, "h:MM") + " and " + dateFormat(now, "ss") + " seconds", null, false); }
}

function date()
{
	console.log("Running the date callback");
	var now = new Date();
	if(global.robin.language === 'nl-NL') {
		exports.say("Het is vandaag "  + dateFormat(now, "fullDate"), null, false);
	} else { exports.say("Today is " + dateFormat(now, "fullDate"), null, false); }
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"WHAT TIME IS IT", callback:time},
	{command:"WHAT IS THE TIME", callback:time},
	{command:"HOW LATE IS IT", callback:time},
	{command:"WHAT DATE IS IT", callback:date},
	{command:"WHAT IS THE DATE", callback:date},
	{command:"WHICH DATE IS IT", callback:date},
	{command:"TELL ME THE TIME", callback:time},
	{command:"WHAT TIME IT IS", callback:time},
	{command:"KNOW THE TIME", callback:time}
];

exports.extendedCommands['nl-NL'] =
[
	{command:"HOE LAAT IS HET", callback:time},
	{command:"WAT IS DE TIJD", callback:time},
	{command:"HOE LAAT HEB JIJ HET", callback:time},
	{command:"WEET JIJ DE TIJD", callback:time},
	{command:"WAT IS DE DATUM", callback:date},
	{command:"WELKE DATUM IS HET", callback:date},
	{command:"DE HOEVEELSTE IS HET VANDAAG", callback:date}
];
