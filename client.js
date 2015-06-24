(function(d) {
	App.init();

	var wsaddress 	= '192.168.25.144:1337', // Alterar aqui endereco do Server WebSocket
		socket		= new WebSocket('ws://' + wsaddress);

	socket.onopen = function() {
		console.log('Conexao Aberta.');

		send({whoami: 'user', operation: 'connect', device : App.getDevice()});
	};

	socket.onerror = function() {
		alert('Erro na conexao.');
	};

	socket.onmessage = function(message) {
		var data = JSON.parse(message.data);

		App.newMessage(data.msg);
	};

	function send(data) {
		socket.send(JSON.stringify(data));
	}

}(document));