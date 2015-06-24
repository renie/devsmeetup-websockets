var webSocketsServerPort = 1337,
	webSocketServer = require('websocket').server,
	http = require('http'),
	HG = require('./HashGenerator'),
	clients = [],
	admin = null;

var server = http.createServer();
server.listen(webSocketsServerPort, function() {
	console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

 
var wsServer = new webSocketServer({
	httpServer: server
});


wsServer.on('request', function(request) {
 
	var conn	= request.accept(null, request.origin),
		id		= HG.newHash();
	
	conn.cnnid	= id;

	checkRepeat(conn.remoteAddress);

	clients.push(conn);
 
	console.log((new Date()) + ' Connection accepted.');

	conn.on('message', function(message) {
		var data = JSON.parse(message.utf8Data);

		if (data.whoami === 'server')
			serverOp(data, id);
		else
			clientOp(data, id);
		
		if (admin) {
			var simplified = getClientsSimplified();
			console.log('enviando mensagem pro admin')
			admin.sendUTF(JSON.stringify( { type: 'users', list: simplified} ));
		}
 	});
});

function broadcast(data) {
	for (var i=0, len = clients.length; i < len; i++) {
		clients[i].sendUTF(data);
	}
}

function getClientById(id) {
	var ret = clients.filter(function(el) {
		return el.cnnid === id;
	});

	return ret.length !== 0 ? ret[0] : false;
}

function getClientsSimplified() {
	return clients.map(function(element){
		return {
			ip: element.remoteAddress,
			id: element.cnnid,
			device : element.device
		}
	});
}

function checkRepeat(data) {
	clients = clients.filter(function(el) {
		return el.remoteAddress !== data
	});
}

function serverOp(data, id) {
	
	if (data.operation === 'connect' && !admin) {
		var client = getClientById(id);
		admin = client;

		console.log('Um admin foi conectado.');
	}

	clients.splice(clients.indexOf(client), 1);
}

function clientOp(data, id) {
	if (data.operation === 'connect') {
		var client = getClientById(id);
		client.device = data.device;

		console.log('Um client ' + client.device + ' foi conectado.');
	}
}