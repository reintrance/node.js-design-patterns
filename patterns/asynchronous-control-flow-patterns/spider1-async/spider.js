// Example of sequential execution flow
var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('../utilities');
var async = require('async');


function download (url, filename, callback) {
    console.log('Downloading ' + url);
    var body;

    async.series([
        (callback) => {
            request(url, (err, response, resBody) => {
                if (err) {
                    return callback(err);
                }

                body = resBody;
                callback();
            });
        },

        mkdirp.bind(null, path.dirname(filename)),

        (callback) => {
            fs.writeFile(filename, body, callback);
        }
    ], (err) => {
        console.log(`Downloaded and saved: ${url}`);

        if (err) {
            return callback(err);
        }

        callback(null, body);
    });
}

function spider (url, callback) {
    var filename = utilities.urlToFileName(url);

    fs.exists(filename, function (exists) {
        if (exists) {
            return callback(null, filename, false);
        } 

        download(url, filename, function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, filename, true);
        })
    });
}

module.exports = spider;