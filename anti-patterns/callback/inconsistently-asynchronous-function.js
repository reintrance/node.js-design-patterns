var fs = require('fs');
var cache = {};

function inconsistentRead (filename, callback) {
    if (cache[filename]) {
        // synchronous immediate invocation
        callback(filename);
    } else {
        // asynchronous invocation
        fs.readFile(filename, 'utf8', function (err, data) {
            cache[filename] = data;
            callback(data);
        });
    }
}

function createFileReader (filename) {
    var listeners = [];

    inconsistentRead(filename, function (value) {
        listeners.forEach(function (listener) {
            listener(value);
        });
    });

    return {
        onDataReady: function (listener) {
            listeners.push(listener);
        }
    }
}

// Problem reproduction
var reader1 = createFileReader('mock-data/data.txt');
reader1.onDataReady(function (data) {
    console.log('First call data.txt: ' + data);
});

setTimeout(function delayedCall() {
    var reader2 = createFileReader('mock-data/data.txt');
    reader2.onDataReady(function (data) {
        // Will never be called
        console.log('Second call data.txt: ' + data);
    });
}, 5000);
