var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('./utilities');

function spider (url, callback) {
    var filename = utilities.urlToFileName(url);

    fs.exists(filename, function (exists) {
        if (!exists) {
            console.log('Downloading ' + url);

            request(url, function (err, response, body) {
                if (err) {
                    callback(err);
                } else {
                    mkdirp(path.dirname(filename), function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            fs.writeFile(filename, body, function (err) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, filename, true);
                                }
                            });
                        }
                    });
                }
            });
        } else {
            callback(null, filename, false);
        }
    });
}

module.exports = spider;