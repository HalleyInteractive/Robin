var confirm = {
    "en-US":
    [
        "YES",
        "SURE",
        "OK",
        "PERFECT",
        "CORRECT",
        "GOOD"
    ],
    "nl-NL":
    [
        "JA",
        "OK",
        "TUURLIJK",
        "PERFECT",
        "GOED"
    ]
};

var decline = {
    "en-US":
    [
        "NO",
        "NOPE",
        "INCORRECT",
        "WRONG"
    ],
    "nl-NL":
    [
        "NEE",
        "NOPE",
        "FOUT"
    ]
}

function acknowledge(cmd)
{
    for(var i = 0; i < confirm[exports.robin.language].length; i++) { if(cmd.match(confirm[exports.robin.language][i].command)){ return 1; } }
    for(var i = 0; i < decline[exports.robin.language].length; i++) { if(cmd.match(decline[exports.robin.language][i].command)){ return 0; } }
    return -1;
}

exports.check = acknowledge;
