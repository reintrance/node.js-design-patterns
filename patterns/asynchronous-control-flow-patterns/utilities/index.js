var url = require('url');
var path = require('path');

function urlToFileName (urlString) {
    var urlObject = url.parse(urlString);
    var filename = path.normalize(`${process.cwd()}/downloads/${urlObject.pathname}`);

    return filename;
}

module.exports.urlToFileName = urlToFileName;