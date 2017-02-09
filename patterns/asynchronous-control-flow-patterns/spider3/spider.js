// Parallel execution flow
var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('../utilities');

var spidering = {};

function saveFile (filename, contents, callback) {
    mkdirp(path.dirname(filename), function (err) {
        if (err) {
            return callback(err);
        }

        fs.writeFile(filename, contents, callback);
    });
}

function download (url, filename, callback) {
    console.log('Downloading ' + url);

    request(url, function (err, response, body) {
        if (err) {
            return callback(err);
        } 
        
        saveFile(filename, body, function (err) {
            console.log(`Downloaded and saved: ${url}`);

            if (err) {
                return callback(err);
            }

            callback(null, body);
        });
        
    });
}

function spiderLinks (currentUrl, body, nesting, callback) {
    if (nesting === 0) {
        process.nextTick(callback);
    }

    let links = utilities.getAllLinks(currentUrl, body);

    var completed = 0;
    var errored = false;

    function done (err) {
        if (err) {
            errored = true;
            return callback(err);
        }

        if (++completed === links.length && !errored) {
            return callback();
        }
    }

    links.forEach(function (link) {
        spider(link, nesting - 1, done);
    });
}

function spider (url, nesting, callback) {
    var filename = utilities.urlToFileName(url);

    if (spidering[url]) {
        return process.nextTick(callback);
    }

    spidering[url] = true;

    fs.readFile(filename, 'utf8', function (err, body) {
        if (err) {
            if (err.code !== 'ENOENT') {
                return callback(err);
            }

            return download(url, filename, function (err, body) {
                if (err) {
                    return callback(err);
                }

                spiderLinks(url, body, nesting, callback);
            });
        } 

        spiderLinks(url, body, nesting, callback);
    });
}

module.exports = spider;