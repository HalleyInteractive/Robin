/* globals exports, global */

var countdown = 0;

function selfie()
{
	console.log("Running the selfie callback");
	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("Taking picture in " + exports.settings.delay);
	break;
	case "nl-NL":
		global.robin.mouth.say("Neem een foto in " + exports.settings.delay);
	break;
	}
    countdown = exports.settings.delay;
    setTimeout(selfieCountdownHandler, 1000);
}

function selfieCountdownHandler()
{
    if(--countdown === 0)
	{
		global.robin.mouth.say("Cheese");
		global.robin.eyes.takeStill(sendSelfie);
	}
    else { global.robin.mouth.say(countdown); setTimeout(selfieCountdownHandler, 1000); }
}

function sendSelfie(path)
{
	if(global.robin.pluginlist.pushbullet && global.robin.pluginlist.pushbullet.active)
	{
		console.log("PUSH PATH: ");
		console.log(path);
		global.robin.plugins.pushbullet.file(path);
	}
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"TAKE SELFIE", callback:selfie},
	{command:"TAKE PICTURE", callback:selfie},
    {command:"TAKE STILL", callback:selfie},
    {command:"TAKE PHOTO", callback:selfie},
	{command:"TAKE A SELFIE", callback:selfie},
	{command:"TAKE A PICTURE", callback:selfie},
    {command:"TAKE A STILL", callback:selfie},
    {command:"TAKE A PHOTO", callback:selfie}
];
exports.extendedCommands['nl-NL'] =
[
	{command:"NEEM SELFIE", callback:selfie},
    {command:"NEEM FOTO", callback:selfie},
    {command:"FOTO NEMEN", callback:selfie},
    {command:"FOTO MAKEN", callback:selfie}
];
