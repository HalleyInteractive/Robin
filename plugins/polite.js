/* globals exports */

function politeEnglish()
{
	console.log("Running the polite callback");

	var rnd = Math.floor(Math.random() * 4);
	if(rnd === 0) { global.robin.mouth.say("You are welcome"); }
	if(rnd === 1) { global.robin.mouth.say("No problemo");	}
	if(rnd === 2) { global.robin.mouth.say("Sure thing"); }
	if(rnd === 3) { global.robin.mouth.say("Any time"); }
}

function politeDutch()
{
	console.log("Running the polite callback");

	var rnd = Math.floor(Math.random() * 4);
	if(rnd === 0) { global.robin.mouth.say("Graag gedaan"); }
	if(rnd === 1) { global.robin.mouth.say("Geen probleem");	}
	if(rnd === 2) { global.robin.mouth.say("Tuurlijk"); }
	if(rnd === 3) { global.robin.mouth.say("Voor jou altijd"); }
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
