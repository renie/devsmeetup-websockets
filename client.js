(function(d) {
	App.init();
	
	var socket		= new WebSocket("ws://192.168.25.144:1337");

	socket.onopen = function() {
		console.log('Conexao Aberta.');

		send({whoami: 'user', operation: 'connect', device : App.getDevice()});
	};

	socket.onerror = function() {
		console.log('Erro na conexao.');
	};

	function send(data) {
		socket.send(JSON.stringify(data));
	}

}(document));