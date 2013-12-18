var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var mime = require('mime');

//io.set('log level', 1);
app.listen(8092);

function handler(request, response)
{

	var file = __dirname + (request.url == '/' ? '/server/index.html' : '/server/' + request.url);
	console.log("File: " + file);
	content_type = mime.lookup(file);
    fs.readFile(file, function(error, data)
	{
        if (error)
		{
            response.writeHead(500);
            return response.end('Error loading ' + file);
        }
        response.setHeader('Content-Type', content_type);
		response.writeHead(200);
		response.end(data);
    });
}

io.sockets.on('connection', function (socket)
{
	socket.on('basiccmd', basiccmd);
	socket.on('extendedcmd', extendedcmd);
});

function basiccmd(cmd)
{
	console.log("Received basic cmd from server: " + cmd);
	exports.basiccmd(cmd);
}

function extendedcmd(cmd)
{
	console.log("Received extended cmd from server: " + cmd);
	exports.extendedcmd(cmd);
}
