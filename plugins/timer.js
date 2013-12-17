/* globals exports */

var startTime;
var endTime;
var timerInterval = undefined;

var seconds = 0;
var minutes = 0;
var hours = 0;

function timer(cmd)
{
	if(timerInterval === undefined)
	{
		seconds = 0;
		minutes = 0;
		hours = 0;

		startTime = new Date();
		endTime = new Date();

		addToTimer(cmd[2], cmd[1]);
		//addToTimer(cmd[4], cmd[3]);

		console.log("Timer: ");
		console.log(hours + " hours left");
		console.log(minutes + " minutes left");
		console.log(seconds + " seconds left");
		console.log(" --- ");


		timerInterval = setInterval(checkTimer, 1000);
	} else
	{
		exports.say("Timer is already running, cancel the timer first");
	}
}

function checkTimer()
{
	var diff = new Date(endTime.getTime() - new Date().getTime());
	if(diff.getSeconds() <= 0 && diff.getMinutes() <= 0 && diff.getHours() <= 0)
	{
		console.log("Timer done");
		clearInterval(timerInterval);
		timerInterval = undefined;
	}


	console.log("Timer: ");
	console.log(diff.getHours() + " hours left");
	console.log(diff.getMinutes() + " minutes left");
	console.log(diff.getSeconds() + " seconds left");
	console.log(" --- ");

}

function addToTimer(property, value)
{

	value = parseInt(value, 10);

	switch(property)
	{
		case "SECONDS":
			endTime.setSeconds(endTime.getSeconds() + value);
			seconds += value;
			break;
		case "MINUTES":
			endTime.setMinutes(endTime.getMinutes() + value);
			minutes += value;
			break;
		case "HOURS":
			endTime.setHours(endTime.getHours() + value);
			hours += value;
			break;
		default:
			break;
	}
}

function stopTimer()
{
	clearInterval(timerInterval);
	timerInterval = undefined;
	exports.say("Timer canceled");
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"TIMER FOR (\\d+) (MINUTES|SECONDS|HOURS)$", callback:timer},
	{command:"TIMER FOR (\\d+) (MINUTES|SECONDS|HOURS) AND (\\d+) (MINUTES|SECONDS|HOURS)", callback:timer},
	{command:"STOP TIMER", callback:stopTimer},
	{command:"CANCEL TIMER", callback:stopTimer},
];
