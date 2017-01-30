var url = require('url');
var path = require('path');
var getUrls = require('get-urls')

function urlToFileName (urlString) {
    var urlObject = url.parse(urlString);
    var filename = path.normalize(`${process.cwd()}/downloads/${urlObject.pathname}`);

    return filename;
}

function getAllLinks (currentUrl, body) {
    var urls = getUrls(body);
    var urlObject = url.parse(currentUrl);

    // TODO: investigate set cuz this implementation is ugly.
    return Array.from(urls).filter((current) => {
        return current.indexOf(urlObject.host) !== -1;
    });
}

module.exports = {
    urlToFileName,
    getAllLinks
};