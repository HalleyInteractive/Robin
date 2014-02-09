/* globals document, io, $ */

var socket = io.connect('http://localhost:3141');
var facesCanvas;
var facesCtx;
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

	/*
    facesCanvas = document.getElementById("faces");
    facesCtx = facesCanvas.getContext("2d");

    socket.on('log', function (data)
    {
        console.log(data);
    });

    socket.on('image', function (data)
    {

		data.width /= 4;
		data.height /= 4;

        var image = document.getElementById('camera');
        image.width = data.width;
        image.height = data.height;
        image.src = "data:image/jpeg;base64," + data.image;

        var faces = document.getElementById('faces');
        faces.width = data.width;
        faces.height = data.height;

        facesCtx.clearRect(0, 0, data.width, data.height);
        for(var i = 0; i < data.faces.length; i++)
        {
            facesCtx.beginPath();
            facesCtx.lineWidth = "1";
            facesCtx.strokeStyle = "#FF0000";
            facesCtx.rect(data.faces[i].x, data.faces[i].y, data.faces[i].width, data.faces[i].height);
            facesCtx.stroke();
        }

    });
	*/
	$(".navbar-brand").popover({html:true, trigger:'hover'});
});
