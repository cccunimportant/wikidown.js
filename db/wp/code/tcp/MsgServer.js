var net = require('net');

var server = net.createServer();

server.on('connection', function(sock) {
  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    sock.write('You said "' + data + '"');        
  });
    
  sock.on('close', function(data) {
    console.log('CLOSED!');
  });
});

var PORT = 5757, HOST='127.0.0.1';
server.listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);