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

/* Silences the output */
io.set('log level', 1);

/* Set port number for the server */
app.listen(3141);

/*
* Jade template engine
* Author: TJ Holowaychuk
* Github: https://github.com/visionmedia/jade
*/
var jade = require('jade');

/*
* JavaScript/NodeJS Merge is a tool to merge multiple objects into one object, with the possibility of create a new object cloned.
* Author: Yeikos
* Github: https://github.com/yeikos/js.merge
*/
var merge = require('merge');

/**
* Handler for all the requests that are made to the server
*
* @method handler
* @param {Object} http request
* @param {Object} http response
*/
function handler(request, response)
{

	var file = __dirname + (request.url == '/' ? '/server/index.html' : '/server' + request.url);
	var content_type = mime.lookup(file);

	file = file.substr(-5,5) === ".html" ? file.replace(".html", ".jade") : file;
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
            var source = { settings : global.robin.settings, languages:global.robin.languages, plugins:global.robin.pluginlist };
			var options = {filename:'server' + request.url, basedir:'server', compiledebug:false, pretty: true};
			var html = jade.render(data.toString('utf-8'), merge(options, source));
            response.write(html);
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
	global.robin.server.connections++;
	if(global.robin.server.connections === 1){ global.robin.eyes.startCameraOutput(); }
	socket.on('basiccmd', basiccmd);
	socket.on('extendedcmd', extendedcmd);
	socket.on('reload_settings', global.robin.brain.reloadSettings);
	socket.on('restart_module', restartModule);
	socket.on('reload_plugins', global.robin.reloadPlugins);
	socket.on('disconnect', function()
	{
		global.robin.server.connections--;
		if(global.robin.server.connections === 0){ global.robin.eyes.stopCameraOutput(); }
	});
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
		case "eyes":
			global.robin.restartRobinEyes();
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
global.robin.server.connections = 0;
