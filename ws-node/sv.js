var webSocketsServerPort = 1337,
	webSocketServer = require('websocket').server,
	http = require('http'),
	HG = require('./HashGenerator'),
	clients = [];

var server = http.createServer();
server.listen(webSocketsServerPort, function() {
	console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

 
var wsServer = new webSocketServer({
	httpServer: server
});


wsServer.on('request', function(request) {
 
	var connection = request.accept(null, request.origin),
		oid = HG.newHash();
	connection.myconnid = oid;
	
	var index = clients.push(connection) - 1;
 
	console.log((new Date()) + ' Connection accepted.');
	console.log(clients)
 
});

function broadcast(data) {
	for (var i=0, len = clients.length; i < len; i++) {
		clients[i].sendUTF(data);
	}
}