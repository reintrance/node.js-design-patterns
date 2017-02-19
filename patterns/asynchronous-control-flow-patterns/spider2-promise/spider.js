// Sequential execution and iteration flows with promises
const utilities = require('../utilities');
const request = utilities.promisify(require('request'));
const mkdirp = utilities.promisify(require('mkdirp'));
const path = require('path');
const fs = require('fs');
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

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
    let promise = Promise.resolve();

    if (nesting === 0) {
        return promise
    }

    let links = utilities.getAllLinks(currentUrl, body);

    links.forEach((url) => {
        promise = promise.then(() => {
            return spider(url, nesting - 1);
        });
    });

    return promise;
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