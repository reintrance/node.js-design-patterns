var fs = require('fs');

function readJSON (filename, callback) {
    fs.readFile(filename, 'utf8', function (err, data) {
        var parsed;

        if (err) {
            return callback(err);
        } 

        // If this part throws error it will cause exception to go to event loop and program termination
        parsed = JSON.parse(data);

        // If no errors send null as first parameter
        callback(null, parsed);
    });
}

try {
    readJSON('mock-data/data.txt', function (err, data) {
        console.log(err);
    });
} catch (err) {
    console.log('This catch block wont catch any errors since error from asynchtonous callback is thrown in a different stack after this code was already executed.');
}

// That is the last chance to catch uncaught exceptions
process.on('uncaughtException', function (err) {
    console.log('Error message: ' + err.message);

    // This is to terminate application, without it app will continue to work 
    process.exit(1);
});