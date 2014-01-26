function didNotUnderstand()
{
	var response = [];
	switch(global.robin.language)
	{
	case "en-US":
	default:
		response = [
        "Sorry, I did not get that",
        "I did not understand that",
        "That sounds like chinese"
		];
	break;
	case "nl-NL":
		response = [
        "Sorry, dat verstond ik niet",
        "Dat verstond ik niet",
        "Spreek je chinees ofzo? Ik begrijp niets van wat je zegt"
		];
	break;
	}


    exports.say(response[Math.floor(Math.random()*response.length)]);
}

exports.didNotUnderstand = didNotUnderstand;
