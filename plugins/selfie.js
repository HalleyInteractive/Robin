/* globals exports */

var countdown = 0;

function selfie()
{
	console.log("Running the selfie callback");
    exports.say("Taking selfie in 3");
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
