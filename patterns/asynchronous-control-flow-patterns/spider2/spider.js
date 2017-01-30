// Sequential iteration flow
var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('../utilities');

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

    function iterate (index) {
        if (index === links.length) {
            return callback();
        }

        spider(links[index], nesting - 1, function (err) {
            if (err) {
                return callback(err);
            }

            iterate(index + 1);
        });
    }

    iterate(0);
}

function spider (url, nesting, callback) {
    var filename = utilities.urlToFileName(url);

    fs.readFile(filename, 'utf8', function (err, body) {
        if (err) {
            if (err.code !== 'ENOENT') {
                return callback(err);
            }

            download(url, filename, function (err) {
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