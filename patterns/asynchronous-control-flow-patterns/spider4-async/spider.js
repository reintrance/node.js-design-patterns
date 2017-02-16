// Limited parallel execution flow
const fs = require('fs');
const request = require('request');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('../utilities');
const async = require('async');

const downloadQueue = async.queue((taskData, callback) => {
    spider(taskData.link, taskData.nesting - 1, callback)
}, 2);

function download (url, filename, callback) {
    console.log('Downloading ' + url);
    let body;

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

function spiderLinks (currentUrl, body, nesting, callback) {
    if (nesting === 0) {
        return process.nextTick(callback);
    }

    let links = utilities.getAllLinks(currentUrl, body);
    if (links.length === 0) {
        return process.nextTick(callback);
    }

    let completed = 0;
    let errored = false;
    links.forEach((link) => {
        let taskData = {
            link: link,
            nesting: nesting
        };

        downloadQueue.push(taskData, (err) => {
            if (err) {
                errored = true;
                return callback(err);
            }

            if (++completed === links.length && !errored) {
                callback();
            }
        });
    });
}

function spider (url, nesting, callback) {
    var filename = utilities.urlToFileName(url);

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