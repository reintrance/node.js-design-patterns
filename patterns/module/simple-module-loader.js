var fs = require('fs');

function loadModule (filename, module, require) {
	var wrapSrc = '(function (module, exports, require) {' +
		fs.readFileSync(filename, 'utf8');
	+ '})(module, module.exports, require);';

	eval(wrapSrc);
}