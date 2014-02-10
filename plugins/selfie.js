/* globals exports, global */

var countdown = 0;

function selfie()
{
	console.log("Running the selfie callback");
	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("Taking selfie in 3");
	break;
	case "nl-NL":
		global.robin.mouth.say("Neem een selfie in 3");
	break;
	}
    countdown = 3;
    setTimeout(selfieCountdownHandler, 1000);
}

function selfieCountdownHandler()
{
    if(--countdown === 0) { global.robin.eyes.takeStill(); }
    else { global.robin.mouth.say(countdown); setTimeout(selfieCountdownHandler, 1000); }
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
