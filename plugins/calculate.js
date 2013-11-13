function plus(cmd)
{
	console.log("Running the PLUS calculate callback");
	exports.say("The sum of " + cmd[1] + " plus " + cmd[2] + " is " + (parseFloat(cmd[1]) + parseFloat(cmd[2])).toFixed(2));
}

function minus(cmd)
{
	console.log("Running the MINUS calculate callback");
	exports.say("The sum of " + cmd[1] + " minus " + cmd[2] + " is " + (parseFloat(cmd[1]) - parseFloat(cmd[2])).toFixed(2));
}

function divided(cmd)
{
	console.log("Running the DIVIDED calculate callback");
	exports.say("The sum of " + cmd[1] + " divided by" + cmd[2] + " is " + (parseFloat(cmd[1]) / parseFloat(cmd[2])).toFixed(2));
}

function times(cmd)
{
	console.log("Running the TIMES calculate callback");
	exports.say("The sum of " + cmd[1] + " times " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])).toFixed(2));
}

exports.extendedCommands =
[
	{command:"WHAT IS THE SUM OF (\\d+) PLUS (\\d+)", callback:plus},
	{command:"WHAT IS THE SUM OF (\\d+) MINUS (\d+)", callback:minus},
	{command:"WHAT IS THE SUM OF (\\d+) DIVIDED BY (\\d+)", callback:divided},
	{command:"WHAT IS THE SUM OF (\\d+) TIMES (\\d+)", callback:times}
];
