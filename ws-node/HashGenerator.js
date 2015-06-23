var HashManager = (function(){

	var generated = [];

	function gen() {
		var t = "";
			range = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i = 0; i < 20; i++ )
		    t += range.charAt(Math.floor(Math.random() * range.length));

		if (generated.indexOf(t) === -1)
			return t;
		return gen();
	}

	return {
		newHash : gen
	};

}());

module.exports = HashManager;