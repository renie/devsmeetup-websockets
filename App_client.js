var App = (function(d){
	
	var device,
		messages = d.querySelector('.messages .content');

	function init() {
		setDeviceName();
	}

	function setDeviceName() {
		if (navigator.userAgent.search(/iPod|iPad|iPhone|iOS/gi) > 0)
			device = 'ios';
		else if (navigator.userAgent.search(/android/gi) > 0)
			device = 'android';
		else
			device = 'other';
	}

	function getDevice() {
		return device;
	}

	function addMsg(msg) {
		var newMsg = '<p>',
			d = new Date();

		newMsg += '<strong>' + d.getHours() + 'h' + ('0'+d.getMinutes()).slice(-2) + ':</strong>';
		newMsg += '<em>' + msg + '</em>';
		newMsg += '</p>';

		messages.innerHTML += newMsg;

	}

	return {
		init : init,
		getDevice : getDevice,
		newMessage : addMsg
	}
}(document));