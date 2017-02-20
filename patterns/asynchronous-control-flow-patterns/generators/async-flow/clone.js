const fs = require('fs');
const path = require('path');
const asyncFlow = require('./index');

asyncFlow(function* (callback) {
    let fileName = path.basename(__filename);
    let myself = yield fs.readFile(fileName, 'utf8', callback);
    yield fs.writeFile(`clone_of_${fileName}`, myself, callback);
    console.log('Clone created');
});