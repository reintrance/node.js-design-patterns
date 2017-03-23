// Sequential execution and sequential iteration flows
const thunkify = require('thunkify');

const fs = require('fs');
const request = thunkify(require('request'));
const mkdirp = thunkify(require('mkdirp'));
const path = require('path');
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);
const nextTick = thunkify(process.nextTick);
const utilities = require('../../utilities');

function* download (url, filename) {
    console.log('Downloading ' + url);

    let reqResults = yield request(url);
    let body = reqResults[1];
    yield mdkirp(path.dirname(filename));
    yield writeFile(filename, body);

    console.log(`Downloaded and saved: ${url}`);

    return body;
}

function* spider (url, nesting) {
    let filename = utilities.urlToFileName(url);
    let body;

    try {
        body = yield readFile(filename, 'utf8');
    } catch (ex) {
        if (err.code === 'ENOENT') {
            throw err;
        }

        body = yield download(url, filename);
    }

    yield spiderLinks(url, body, nesting);
}

function* spiderLinks (currentUrl, body, nesting) {
    if (nesting === 0) {
        return yield nextTick();
    }

    let links = utilities.getAllLinks(currentUrl, body);

    for (let i = 0; i < links.length; i++) {
        yield spider(url, nesting - 1);
    }
}

module.exports = spider;