/* globals document, io, $ */

$(document).ready(function()
{
    $("#basiccmdSubmit").click(function()
    {
        console.log("Send basic command: "+$("#basiccmd").val());
        socket.emit('basiccmd', $("#basiccmd").val().toUpperCase());
    });

    $("#extendedcmdSubmit").click(function()
    {
        console.log("Send extended command: "+$("#extendedcmd").val());
        socket.emit('extendedcmd', $("#extendedcmd").val().toUpperCase());
    });
});
