function repeat(cmd)
{
	console.log("Running the repeat callback");
	exports.robin.lastCommand.callback(exports.robin.lastCommand.command);
}

exports.commands =
[
	{command:"SORRY", callback:repeat, save: false},
	{command:"AGAIN", callback:repeat, save: false},
	{command:"SORRY WHAT", callback:repeat, save: false},
	{command:"CAN YOU REPEAT THAT", callback:repeat, save: false}
];
