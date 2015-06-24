(function(d) {
	App.init();
	
	var wsaddress 	= '192.168.133.133:1337', // Alterar aqui endereco do Server WebSocket
		socket		= new WebSocket('ws://' + wsaddress);
	
	socket.onopen = function() {
		console.log('Conexao Aberta.');

		send({whoami: 'server', operation: 'connect'});
	};

	socket.onerror = function() {
		alert('Erro na conexao.');
	};

	socket.onmessage = function(message) {
		var data = JSON.parse(message.data);

		if (data.type === 'users')
			App.updateList(data.list);
	};

	d.getElementById('send').addEventListener('click', function() {
		var sel = App.getSelected(),
			data = {
				whoami: 'server',
				type : 'msg',
				msg : d.getElementById('msg').value,
				to: sel
			};

		send(data);

		alert('Mensagem enviada!');
	});

	function send(data) {
		socket.send(JSON.stringify(data));
	}

	

}(document));