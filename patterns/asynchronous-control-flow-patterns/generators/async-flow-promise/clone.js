const fs = require('fs');
const path = require('path');
const asyncFlow = require('./index');
const utilities = require('../../utilities');
var readFile = utilities.promisify(fs.readFile);
var writeFile = utilities.promisify(fs.writeFile);

asyncFlow(function* () {
    let fileName = path.basename(__filename);
    let myself = yield readFile(fileName, 'utf8');
    yield writeFile(`clone_of_${fileName}`, myself);
    console.log('Clone created');
});