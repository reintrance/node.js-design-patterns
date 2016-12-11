var FindPattern = require('./find-pattern');

var pattern = /hello/g;
var findPatternInstance = new FindPattern(pattern);

findPatternInstance
    .addFile('mock-data/fileA.json')
    .addFile('mock-data/fileB.json')
    .find()
    .on('fileread', function (file) {
        console.log(file + ' was read');
    })
    .on('found', function (file, match) {
        console.log('Matched "' + match + '" file ' + file);
    })
    .on('error', function (err) {
        console.log('Error emmited: ' + err.message);
    });