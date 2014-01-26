/* globals exports, clearInterval, setInterval */

var startTime;
var endTime;
var timerInterval;

var seconds = 0;
var minutes = 0;
var hours = 0;
var timerlength = "";

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
		addToTimer(cmd[4], cmd[3]);

		console.log("Timer: ");
		console.log(hours + " hours left");
		console.log(minutes + " minutes left");
		console.log(seconds + " seconds left");
		console.log(" --- ");

		timerlength = "";
		if(hours > 0) { timerlength += hours.toString() + (hours == 1 ? " hour" : " hours"); }
		if(minutes > 0) { timerlength += minutes.toString() + (minutes == 1 ? " minute" : " minutes"); }
		if(seconds > 0) { timerlength += seconds.toString() + (seconds == 1 ? " second" : " seconds"); }

		exports.say("Timer is set for " + timerlength);

		timerInterval = setInterval(checkTimer, 1000);
	} else
	{
		exports.say("Timer is already running, cancel the timer first");
	}
}

function checkTimer()
{
	var now = new Date();
	var diff = new Date(
		0 /* Year */,
		0 /* Month */,
		0 /* Day */,
		endTime.getHours() - now.getHours() /* Hours */,
		endTime.getMinutes() - now.getMinutes() /* Minutes */,
		endTime.getSeconds() - now.getSeconds() /* Seconds */);

	if(diff.getSeconds() <= 0 && diff.getMinutes() <= 0 && diff.getHours() <= 0)
	{
		console.log("Timer done");
		exports.say(timerlength + " has passed. Timer is done.");
		clearInterval(timerInterval);
		timerInterval = undefined;
	}
	// TODO Notify about the time left every x Hours, minutes and seconds


	console.log("Timer: ");
	console.log(diff.getHours() + " hours left");
	console.log(diff.getMinutes() + " minutes left");
	console.log(diff.getSeconds() + " seconds left");
	console.log(" --- ");

}

function timeLeft()
{
	var now = new Date();
	var diff = new Date(
		0 /* Year */,
		0 /* Month */,
		0 /* Day */,
		endTime.getHours() - now.getHours() /* Hours */,
		endTime.getMinutes() - now.getMinutes() /* Minutes */,
		endTime.getSeconds() - now.getSeconds() /* Seconds */);

	exports.say("There is " + diff.getHours() + " hours " + diff.getMinutes() + " minutes and " + diff.getSeconds() + " seconds left on the timer");

}

function addToTimer(property, value)
{
	console.log("Add to timer: " + property + ": " + value);
	value = parseInt(value, 10);

	switch(property)
	{
	case "SECONDS":
	case "SECOND":
		endTime.setSeconds(endTime.getSeconds() + value);
		seconds += value;
		break;
	case "MINUTES":
	case "MINUTE":
		endTime.setMinutes(endTime.getMinutes() + value);
		minutes += value;
		break;
	case "HOURS":
	case "HOUR":
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
	{command:"TIMER FOR (\\d+) (MINUTES|SECONDS|HOURS|MINUTE|SECOND|HOUR)$", callback:timer},
	{command:"TIMER FOR (\\d+) (MINUTES|SECONDS|HOURS|MINUTE|SECOND|HOUR) AND (\\d+) (MINUTES|SECONDS|HOURS|MINUTE|SECOND|HOUR)", callback:timer},
	{command:"STOP TIMER", callback:stopTimer},
	{command:"CANCEL TIMER", callback:stopTimer},
	{command:"TIME LEFT ON THE TIMER", callback:timeLeft},
	{command:"TIME IS THERE LEFT ON THE TIMER", callback:timeLeft},
	{command:"TIME IS LEFT ON THE TIMER", callback:timeLeft},
];
