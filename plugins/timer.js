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

		switch(global.robin.settings.language)
		{
		case "en-US":
		default:
			global.robin.mouth.say("Timer is set for " + timerlength);
		break;
		case "nl-NL":
			global.robin.mouth.say("Wekker is gezet voor over " + timerlength);
		break;
		}

		timerInterval = setInterval(checkTimer, 1000);
	} else
	{
		switch(global.robin.settings.language)
		{
		case "en-US":
		default:
			global.robin.mouth.say("Timer is already running, cancel the timer first");
		break;
		case "nl-NL":
			global.robin.mouth.say("Er loopt al een wekker, annuleer deze eerst");
		break;
		}

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
		switch(global.robin.settings.language)
		{
		case "en-US":
		default:
			global.robin.mouth.say(timerlength + " has passed. Timer is done.");
		break;
		case "nl-NL":
			global.robin.mouth.say(timerlength + " is voorbij. De wekker is klaar.");
		break;
		}
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


	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("There is " + diff.getHours() + " hours ");
		global.robin.mouth.say(diff.getMinutes() + " minutes");
		global.robin.mouth.say("and " + diff.getSeconds() + " seconds left on the timer");
	break;
	case "nl-NL":
		global.robin.mouth.say("Er is " + diff.getHours() + " uur ");
		global.robin.mouth.say(diff.getMinutes() + " minuten");
		global.robin.mouth.say("en " + diff.getSeconds() + " seconden over op de wekker");
	break;
	}
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

	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("Timer canceled");
	break;
	case "nl-NL":
		global.robin.mouth.say("Wekker geannuleerd");
	break;
	}
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
	{command:"TIME IS LEFT ON THE TIMER", callback:timeLeft}
];
exports.extendedCommands['nl-NL'] =
[
	{command:"WEKKER VOOR OVER (\\d+) (MINUTEN|SECONDEN|UREN|MINUUT|SECONDE|UUR)$", callback:timer},
	{command:"TIMER FOR (\\d+) (MINUTEN|SECONDEN|UREN|MINUUT|SECONDE|UUR) EN (\\d+) (MINUTEN|SECONDEN|UREN|MINUUT|SECONDE|UUR)", callback:timer},
	{command:"STOP WEKKER", callback:stopTimer},
	{command:"ANNULEER WEKKEr", callback:stopTimer},
	{command:"TIJD OVER OP DE WEKKER", callback:timeLeft},
	{command:"TIJD IS ER OVER OP DE WEKKER", callback:timeLeft},
	{command:"WEKKER AFLOOFT", callback:timeLeft}
];
