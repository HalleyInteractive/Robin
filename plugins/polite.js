
function polite(cmd)
{
	console.log("Running the polite callback");

	var rnd = Math.floor(Math.random() * 4);
	if(rnd === 0) { exports.say("You are welcome"); }
	if(rnd === 1) { exports.say("No problemo");	}
	if(rnd === 2) { exports.say("Sure thing"); }
	if(rnd === 3) { exports.say("Any time"); }
}

exports.commands =
[
	{command:"THANK YOU", callback:polite},
	{command:"THANK YOU ROBIN", callback:polite},
	{command:"THANKS", callback:polite},
	{command:"THANKS ROBIN", callback:polite},
];
