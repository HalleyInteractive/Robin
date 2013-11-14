/* globals exports */

function politeEnglish()
{
	console.log("Running the polite callback");

	var rnd = Math.floor(Math.random() * 4);
	if(rnd === 0) { exports.say("You are welcome"); }
	if(rnd === 1) { exports.say("No problemo");	}
	if(rnd === 2) { exports.say("Sure thing"); }
	if(rnd === 3) { exports.say("Any time"); }
}

function politeDutch()
{
	console.log("Running the polite callback");

	var rnd = Math.floor(Math.random() * 4);
	if(rnd === 0) { exports.say("Graag gedaan"); }
	if(rnd === 1) { exports.say("Geen probleem");	}
	if(rnd === 2) { exports.say("Tuurlijk"); }
	if(rnd === 3) { exports.say("Voor jou altijd"); }
}

exports.basicCommands = [];
exports.basicCommands['en-US'] =
[
	{command:"THANK YOU", callback:politeEnglish},
	{command:"THANKS", callback:politeEnglish},
];
exports.basicCommands['nl-NL'] =
[
	{command:"DANKJEWEL", callback:politeDutch},
	{command:"DANK JE WEL", callback:politeDutch},
	{command:"BEDANKT", callback:politeDutch},
];
