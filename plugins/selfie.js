/* globals exports, global */

var countdown = 0;

function selfie()
{
	console.log("Running the selfie callback");
	switch(global.robin.language)
	{
	case "en-US":
	default:
		exports.say("Taking selfie in 3");
	break;
	case "nl-NL":
		exports.say("Neem een selfie in 3");
	break;
	}
    countdown = 3;
    setTimeout(selfieCountdownHandler, 1000);
}

function selfieCountdownHandler()
{
    if(--countdown === 0) { exports.eyes.takeStill(); }
    else { exports.say(countdown); setTimeout(selfieCountdownHandler, 1000); }
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"TAKE SELFIE", callback:selfie},
	{command:"TAKE PICTURE", callback:selfie},
    {command:"TAKE STILL", callback:selfie},
    {command:"TAKE PHOTO", callback:selfie}
];
exports.extendedCommands['nl-NL'] =
[
	{command:"NEEM SELFIE", callback:selfie},
    {command:"NEEM FOTO", callback:selfie},
    {command:"FOTO NEMEN", callback:selfie},
    {command:"FOTO MAKEN", callback:selfie}
];
