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
        "INCORRECT", // Will be matched to correct firstr
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
    for(var i = 0; i < confirm[global.robin.language].length; i++) { if(cmd.match(confirm[global.robin.language][i])){ return 1; } }
    for(var i = 0; i < decline[global.robin.language].length; i++) { if(cmd.match(decline[global.robin.language][i])){ return 0; } }
    return -1;
}

exports.check = acknowledge;
