function plus(cmd)
{
	console.log("Running the PLUS calculate callback");
	switch(exports.robin.language)
	{
	case "en-US":
	default:
		exports.say("The sum of " + cmd[1] + " plus " + cmd[2] + " is " + (parseFloat(cmd[1]) + parseFloat(cmd[2])).toFixed(2));
	break;
	case "nl-NL":
		exports.say("The uitkomst van " + cmd[1] + " plus " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])).toFixed(2));
	break;
	}
}

function minus(cmd)
{
	console.log("Running the MINUS calculate callback");
	switch(exports.robin.language)
	{
	case "en-US":
	default:
		exports.say("The sum of " + cmd[1] + " minus " + cmd[2] + " is " + (parseFloat(cmd[1]) - parseFloat(cmd[2])).toFixed(2));
	break;
	case "nl-NL":
		exports.say("The uitkomst van " + cmd[1] + " min " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])).toFixed(2));
	break;
	}
}

function divided(cmd)
{
	console.log("Running the DIVIDED calculate callback");
	switch(exports.robin.language)
	{
	case "en-US":
	default:
		exports.say("The sum of " + cmd[1] + " divided by " + cmd[2] + " is " + (parseFloat(cmd[1]) / parseFloat(cmd[2])).toFixed(2));
	break;
	case "nl-NL":
		exports.say("The uitkomst van " + cmd[1] + " gedeeld door " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])).toFixed(2));
	break;
	}
}

function times(cmd)
{
	console.log("Running the TIMES calculate callback");
	switch(exports.robin.language)
	{
	case "en-US":
	default:
		exports.say("The sum of " + cmd[1] + " times " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])).toFixed(2));
	break;
	case "nl-NL":
		exports.say("The uitkomst van " + cmd[1] + " keer " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])).toFixed(2));
	break;
	}

}

exports.extendedCommands = new Array();
exports.extendedCommands['nl-NL'] =
[
	{command:"HOEVEEL IS (\\d+) PLUS (\\d+)", callback:plus},
	{command:"HOEVEEL IS (\\d+) MIN (\d+)", callback:minus},
	{command:"HOEVEEL IS (\\d+) GEDEELD DOOR (\\d+)", callback:divided},
	{command:"HOEVEEL IS (\\d+) KEER (\\d+)", callback:times}
];

exports.extendedCommands['en-US'] =
[
	{command:"WHAT IS THE SUM OF (\\d+) PLUS (\\d+)", callback:plus},
	{command:"WHAT IS THE SUM OF (\\d+) MINUS (\d+)", callback:minus},
	{command:"WHAT IS THE SUM OF (\\d+) DIVIDED BY (\\d+)", callback:divided},
	{command:"WHAT IS THE SUM OF (\\d+) TIMES (\\d+)", callback:times}
];

