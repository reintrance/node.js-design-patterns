// Limited parallel execution flow
const fs = require('fs');
const request = require('request');
const mkdirp = require('mkdirp');
const path = require('path');

const utilities = require('../utilities');
const TaskQueue = require('./taskQueue');

const downloadQueue = new TaskQueue(2);

let spidering = {};


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
    if (links.length === 0) {
        return process.nextTick(callback);
    }

    let completed = 0;
    let errored = false;

    links.forEach(function (link) {
        downloadQueue.pushTask((done) => {
            spider(link, nesting - 1, function (err) {
                if (err) {
                    errored = true;
                    return callback(err);
                }

                if (++completed === links.length && !errored) {
                    callback();
                }

                done();
            });
        });
    });
}

function spider (url, nesting, callback) {
    let filename = utilities.urlToFileName(url);

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