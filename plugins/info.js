/* globals exports, require, global */
var os = require('os');

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
					// global.robin.mouth.say(details.address);
					var tmpArr = details.address.split(".");
					for(var i = 0; i < tmpArr.length; i++)
					{
						if(i !== 0)
						{
							switch(global.robin.settings.language)
							{
							case "en-US":
							default:
								global.robin.mouth.say("dot");
							break;
							case "nl-NL":
								global.robin.mouth.say("punt");
							break;
							}
						}
						global.robin.mouth.say(tmpArr[i]);
					}
				}
				++alias;
			}
		});
	}
}

function getVersion()
{
	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("I am at version: ");
	break;
	case "nl-NL":
		global.robin.mouth.say("Ik draai op versie: ");
	break;
	}
	var tmpArr = global.robin.settings.version.split(".");
	for(var i = 0; i < tmpArr.length; i++)
	{
		if(i !== 0)
		{
			switch(global.robin.settings.language)
			{
			case "en-US":
			default:
				global.robin.mouth.say("dot");
			break;
			case "nl-NL":
				global.robin.mouth.say("punt");
			break;
			}
		}
		global.robin.mouth.say(tmpArr[i]);
	}
}

function getName()
{

	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("My name is " + global.robin.settings.name);
	break;
	case "nl-NL":
		global.robin.mouth.say("Mijn naam is " + global.robin.settings.name);
	break;
	}
}

function getLanguage()
{
	switch(global.robin.settings.language)
	{
	case "en-US":
	default:
		global.robin.mouth.say("My current language is " + global.robin.settings.language);
	break;
	case "nl-NL":
		global.robin.mouth.say("Mijn huidige taal is " + global.robin.settings.language);
	break;
	}
}

exports.extendedCommands = [];
exports.extendedCommands['en-US'] =
[
	{command:"YOUR IP ADDRESS", callback:getIpAdress},
	{command:"YOUR VERSION", callback:getVersion},
	{command:"YOUR NAME", callback:getName},
	{command:"YOUR LANGUAGE", callback:getLanguage}
];
exports.extendedCommands['nl-NL'] =
[
	{command:"JE IP ADRES", callback:getIpAdress},
	{command:"JOUW IP ADRES", callback:getIpAdress},
	{command:"JE VERSIE", callback:getVersion},
	{command:"JOUW VERSIE", callback:getVersion},
	{command:"JE NAAM", callback:getName},
	{command:"JOUW NAAM", callback:getName},
	{command:"JE TAAL", callback:getLanguage},
	{command:"JOUW TAAL", callback:getLanguage}
];
