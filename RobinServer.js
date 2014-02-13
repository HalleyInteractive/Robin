/* globals exports, require, __dirname, global, eyes */

/* Setup server */
var app = require('http').createServer(handler);

/*
* node.js realtime framework server
* Github: https://github.com/learnboost/socket.io
*/
var io = require('socket.io').listen(app);

/* VIDEO STREAM TEST */
var ss = require('socket.io-stream');
io.on('connection', function(socket)
{
	ss(socket).on('sd', function(stream)
	{
		// stream.pipe(eyes.stream.read());
	});
});
/* END VIDEO STREAM TEST */

/* Include file system utils */
var fs = require('fs');

/*
* Determines the mime type of a file.
* Author: Benjamin Thomas
* Github: https://github.com/broofa/node-mime
*/
var mime = require('mime');

/*
* Handlebars provides the power necessary to let you build semantic templates effectively with no frustration
* Author: Yehuda Katz
* Github: https://github.com/wycats/handlebars.js.git
*/
var handlebars = require('handlebars');

/* Silences the output */
io.set('log level', 1);

/* Set port number for the server */
app.listen(3141);

/**
* Handler for all the requests that are made to the server
*
* @method handler
* @param {Object} http request
* @param {Object} http response
*/
function handler(request, response)
{

	var file = __dirname + (request.url == '/' ? '/server/index.html' : '/server/' + request.url);
	var content_type = mime.lookup(file);
    fs.readFile(file, function(error, data)
	{
        if (error)
		{
            response.writeHead(500);
            return response.end('Error loading ' + file);
        }
        response.setHeader('Content-Type', content_type);
        response.writeHead(200);

        if(content_type === 'text/html')
        {
            var source = { settings : global.robin.settings, languages:global.robin.languages };
            var pageBuilder = handlebars.compile(data.toString('utf-8'));
            var pageText = pageBuilder(source);
            response.write(pageText);
            response.end();
        } else
        {
            response.end(data);
        }
    });
}

/**
* Routes socket requests to specified functions
*
* @param {Socket} socket
*/
io.sockets.on('connection', function (socket)
{
	socket.on('basiccmd', basiccmd);
	socket.on('extendedcmd', extendedcmd);
	socket.on('reload_settings', global.robin.brain.reloadSettings);
	socket.on('restart_module', restartModule);
});

/**
* Passes the command as a basic command to Robin.
*
* @method basiccmd
* @param {String} cmd basic command to be passed to Robin
*/
function basiccmd(cmd)
{
	console.log("Received basic cmd from server: " + cmd);
	global.robin.runBasicCommand(cmd);
}

/**
* Passes the command as a extended command to Robin.
*
* @method extendedcmd
* @param {String} cmd extended command to be passed to Robin
*/
function extendedcmd(cmd)
{
	console.log("Received extended cmd from server: " + cmd);
	global.robin.runExtendedCommand(cmd);
}

/*
* Restarts a module of Robin
*
* @method restartModule
* @param {String} module What module should be restarted. Available: ears
*/
function restartModule(module)
{
	switch(module)
	{
		case "ears":
			global.robin.restartRobinEars();
			break;
		default:
			break;
	}
}

/**
* Emits the msg to all connected sockets
*
* @global
* @method log
* @param {*} msg Message to be logged
*/
function log(msg)
{
	io.sockets.emit('log', msg);
}

/*
* Emits a functioncall to the sockit
* This function is used to set globally
*
* @global
* @method emit
* @param {String} func Function to be called
* @param {String} data Data to be added as param to the called function
*/
function emit(func, data)
{
	io.sockets.emit(func, data);
}

/* Globals */
global.robin.server = {};
global.robin.server.log = log;
global.robin.server.emit = emit;
