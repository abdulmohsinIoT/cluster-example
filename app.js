const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log("Master Process ID: "+process.pid);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    console.log("Worker Process ID: "+process.pid);
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('process ' + process.pid + ' says hello!');
    }).listen(8000);
}