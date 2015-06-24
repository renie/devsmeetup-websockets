var App = (function(){
	
	var device;

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

	return {
		init : init,
		getDevice : getDevice
	}
}());