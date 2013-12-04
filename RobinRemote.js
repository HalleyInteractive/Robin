var tty = require('tty.js');
// TODO: Get Username and Password from RobinBrains and the start server
var app = tty.createServer(
{
    shell: 'bash',
    users:
    {
        admin: 'robin'
    },
    port: 8000
});
app.listen();
