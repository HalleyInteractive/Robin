/* globals document, io, $ */

var socket = io.connect('http://localhost:3141');
var facesCanvas;
var facesCtx;
var customConsole;

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

	$("#restart-ears").click(function()
    {
        socket.emit('restart_module', 'ears');
    });

	$("#restart-eyes").click(function()
    {
        socket.emit('restart_module', 'eyes');
    });
	customConsole = new divConsole();
	socket.on('log', function (data)
    {
        console.log(data);
		customConsole.log(data);
    });

	/*
    facesCanvas = document.getElementById("faces");
    facesCtx = facesCanvas.getContext("2d");



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


function divConsole()
{
	this.scope = this;
	this.element = $("#console");
	this.logQuery = [];


	this.log = function(data)
	{
		console.log(this.scope.element);
		this.scope.logQuery.push("<div class='log-item'>" + data + "</div>");
		if(this.scope.logQuery.length > 10) { this.scope.logQuery.shift(); }
		this.scope.element.empty();
		for(var i = 0; i < this.scope.logQuery.length; i++)
		{
			this.scope.element.prepend(this.scope.logQuery[i]);
		}
	};

}
