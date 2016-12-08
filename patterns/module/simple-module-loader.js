var fs = require('fs');

function loadModule (filename, module, require) {
	var wrapSrc = '(function (module, exports, require) {' +
		fs.readFileSync(filename, 'utf8');
	+ '})(module, module.exports, require);';

	eval(wrapSrc);
}

var require = function (moduleName) {
    console.log('Require invoked for module: ' + moduleName);

    var id = require.resolve(moduleName);

    if (require.cache[id]) {
        return require.cache[id].exports;
    }

    // module metadata
    var module = {
        exports: {},
        id: id
    };

    // update require cache
    require.cache[id] = module;

    // load the module
    loadModuel(id, module, require);

    // return exported members of the module
    return module.exports;
}

require.cache = {};

require.resolve = function (moduleName) {
    // full module id from the moduleName
}