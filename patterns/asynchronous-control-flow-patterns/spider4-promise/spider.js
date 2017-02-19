// Limited parallel execution flow
const utilities = require('../utilities');
const request = utilities.promisify(require('request'));
const mkdirp = utilities.promisify(require('mkdirp'));
const path = require('path');
const fs = require('fs');
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);
const TaskQueue = require('./taskQueue');

const downloadQueue = new TaskQueue(2);


function download (url, filename) {
    console.log('Downloading ' + url);
    let body;

    return request(url).then((results) => {
            body = results[1];
            return mkdirp(path.dirname(filename));
        }).then(() => {
            return writeFile(filename, body);
        }).then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return body;
        });
}

function spiderLinks (currentUrl, body, nesting) {
    if (nesting === 0) {
        return Promise.resolve();
    }

    let links = utilities.getAllLinks(currentUrl, body);
    if (links.length === 0) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        let completed = 0;
        links.forEach((url) => {
            downloadQueue.pushTask(() => {
                return spider(url, nesting - 1).then(() => {
                    if (++completed === links.length) {
                        resolve();
                    }
                }, reject);
            });
        });
    });
}

function spider (url, nesting) {
    let filename = utilities.urlToFileName(url);

    return readFile(filename, 'utf8').then((body) => {
        return spiderLinks(url, body, nesting);
    }, (err) => {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        return download(url, filename).then((body) => {
            return spiderLinks(url, body, nesting)
        });
    });
}

module.exports = spider;