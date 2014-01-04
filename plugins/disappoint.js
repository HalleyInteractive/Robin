function didNotUnderstand()
{
    var response = [
        "Sorry, I did not get that",
        "I did not understand that",
        "That sounds like chinese"
    ];
    exports.say(response[Math.floor(Math.random()*response.length)]);
}

exports.didNotUnderstand = didNotUnderstand;
