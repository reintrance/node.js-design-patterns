const fs = require('fs');
const path = require('path');
const asyncFlow = require('./index');

function readFileThunk (filename, options) {
    return function (callback) {
        fs.readFile(filename, options, callback);
    }
}

function writeFileThunk (filename, content) {
    return function (callback) {
        fs.writeFile(filename, content, callback);
    }
}

asyncFlow(function* () {
    let fileName = path.basename(__filename);
    let myself = yield readFileThunk(fileName, 'utf8');
    yield writeFileThunk(`clone_of_${fileName}`, myself);
    console.log('Clone created');
});