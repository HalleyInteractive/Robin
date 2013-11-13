function repeat(cmd)
{
	console.log("Running the repeat callback");
	if(exports.robin.lastCommand.command !== null && exports.robin.lastCommand.command !== undefined)
	{
		exports.robin.lastCommand.callback(exports.robin.lastCommand.command);
	}
}

exports.basicCommands =
[
	{command:"SORRY", callback:repeat, save: false},
	{command:"AGAIN", callback:repeat, save: false},
	{command:"SORRY WHAT", callback:repeat, save: false},
	{command:"CAN YOU REPEAT THAT", callback:repeat, save: false}
];
