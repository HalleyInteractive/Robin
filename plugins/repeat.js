/* globals exports */

function repeat()
{
	console.log("Running the repeat callback");
	if(global.robin.lastCommand.command !== null && global.robin.lastCommand.command !== undefined)
	{
		global.robin.lastCommand.callback(global.robin.lastCommand.command);
	}
}

exports.basicCommands = [];
exports.basicCommands['en-US'] =
[
	{command:"SORRY", callback:repeat, save: false},
	{command:"AGAIN", callback:repeat, save: false},
	{command:"CAN YOU REPEAT THAT", callback:repeat, save: false}
];

exports.basicCommands['nl-NL'] =
[
	{command:"SORRY", callback:repeat, save: false},
	{command:"NOG EEN KEER", callback:repeat, save: false},
	{command:"JE DAT HERHALEN", callback:repeat, save: false},
];
