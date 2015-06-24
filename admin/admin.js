(function(d) {
	App.init();
	
	var socket		= new WebSocket("ws://192.168.25.144:1337");
	
	socket.onopen = function() {
		console.log('Conexao Aberta.');
		send({whoami: 'server', operation: 'connect'});
	};

	socket.onerror = function() {
		console.log('Erro na conexao.');
	};

	socket.onmessage = function(message) {
		var data = JSON.parse(message.data);

		if (data.type === 'users')
			App.updateList(data.list);

	};

	function send(data) {
		socket.send(JSON.stringify(data));
	}

	

}(document));