function plus(cmd)
{
	console.log("Running the PLUS calculate callback");
	console.log(cmd);
	exports.say("The sum of " + cmd[1] + " plus " + cmd[2] + " is " + (parseFloat(cmd[1]) + parseFloat(cmd[2])));
}

function minus(cmd)
{
	console.log("Running the MINUS calculate callback");
	console.log(cmd);
	exports.say("The sum of " + cmd[1] + " minus " + cmd[2] + " is " + (parseFloat(cmd[1]) - parseFloat(cmd[2])));
}

function divided(cmd)
{
	console.log("Running the DIVIDED calculate callback");
	console.log(cmd);
	exports.say("The sum of " + cmd[1] + " divided " + cmd[2] + " is " + (parseFloat(cmd[1]) / parseFloat(cmd[2])));
}

function times(cmd)
{
	console.log("Running the TIMES calculate callback");
	console.log(cmd);
	exports.say("The sum of " + cmd[1] + " times " + cmd[2] + " is " + (parseFloat(cmd[1]) * parseFloat(cmd[2])));
}

exports.extendedCommand =
[
	{command:"WHAT IS THE SUM OF (\\d+) PLUS (\\d+)", callback:plus},
	{command:"WHAT IS THE SUM OF (\\d+) MINUS (\d+)", callback:minus},
	{command:"WHAT IS THE SUM OF (\\d+) DIVIDED BY (\\d+)", callback:divided},
	{command:"WHAT IS THE SUM OF (\\d+) TIMES (\\d+)", callback:times}
];
