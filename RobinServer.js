var io = require('socket.io').listen(8092);
io.set('log level', 1);
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
