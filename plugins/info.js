var os=require('os');

function getIpAdress()
{
	var ifaces = os.networkInterfaces();
	for (var dev in ifaces)
	{
		var alias=0;
		ifaces[dev].forEach(function(details)
		{
			if (details.family=='IPv4')
			{
				if(dev !== 'lo')
				{
					// console.log(dev+(alias?':'+alias:''), details.address);
					// exports.say(details.address);
					var tmpArr = details.address.split(".");
					for(var i = 0; i < tmpArr.length; i++)
					{
						if(i !== 0) { exports.say("dot"); }
						exports.say(tmpArr[i]);
					}
				}
				++alias;
			}
		});
	}
}

function getVersion()
{
	exports.say("I am at version: ");
	var tmpArr = global.robin.version.split(".");
	for(var i = 0; i < tmpArr.length; i++)
	{
		if(i !== 0) { exports.say("dot"); }
		exports.say(tmpArr[i]);
	}
}

function getName()
{
	exports.say("My name is " + global.robin.name);
}

function getLanguage()
{
	exports.say("My current language is " + global.robin.language);
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"YOUR IP ADDRESS", callback:getIpAdress},
	{command:"YOUR VERSION", callback:getVersion},
	{command:"YOUR NAME", callback:getName},
	{command:"YOUR LANGUAGE", callback:getLanguage}
];
