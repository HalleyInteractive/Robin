/* globals exports, global */

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
};

function acknowledge(cmd)
{
    for(var c = 0; c < confirm[global.robin.language].length; c++) { if(cmd.match(confirm[global.robin.language][c])){ return 1; } }
    for(var d = 0; d < decline[global.robin.language].length; d++) { if(cmd.match(decline[global.robin.language][d])){ return 0; } }
    return -1;
}

exports.check = acknowledge;
