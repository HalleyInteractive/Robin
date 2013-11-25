var spawn = require('child_process').spawn;
var rdb = null;
var r = require('rethinkdb');
var connection = null;
var host = "localhost";
var port = 28015;

// TODO: Registering tables, create if not exist
// TODO: Connect only when server has started
function connect()
{
    rdb = spawn('rethinkdb', ['--http-port', '8083']);
    rdb.on('close', function (code) { console.log('RetinkDb process exited with code ' + code); });
    r.connect({host:host, port:port}, function(err, conn)
    {
        if (err) throw err;
        connection = conn;
        exports.brain.connection = connection;
        r.dbList().run(conn, function(err, list)
        {
            if (err) throw err;
            // Create db Robin if it doesn't exist
            if(list.indexOf("Robin") === -1) { r.dbCreate('Robin').run(connection, function(err) { if (err) throw err; }); }
        });
    });
}

connect();
exports.brain = {};
exports.brain.db = r.db("Robin");
exports.brain.connection = connection;
