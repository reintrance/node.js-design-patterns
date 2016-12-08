// Reveal only parts you want to be wisible for end user
var module = (function () {
	var privateFoo = function () {
		// private function logic
	};
	var privateVar = [];

	var export = {
		publicFoo: function () {},
		publicVar: {}
	};

	return export;
})();