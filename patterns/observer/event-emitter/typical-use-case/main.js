var findPattern = require('./find-pattern');

var filesToCheck = ['mock-data/fileA.json', 'mock-data/fileB.json'];
var pattern = /hello/g;
findPattern(filesToCheck, pattern)
    .on('fileread', function (file) {
        console.log(file + ' was read');
    })
    .on('found', function (file, match) {
        console.log('Matched "' + match + '" file ' + file);
    })
    .on('error', function (err) {
        console.log('Error emmited: ' + err.message);
    });