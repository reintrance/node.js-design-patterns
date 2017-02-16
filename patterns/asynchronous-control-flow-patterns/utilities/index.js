const url = require('url');
const path = require('path');
const getUrls = require('get-urls');

function urlToFileName (urlString) {
    let urlObject = url.parse(urlString);
    let fileName  = path.basename(urlObject.pathname);
    let pathToFile = fileName ? urlObject.pathname : path.join(urlObject.pathname, 'index.html');

    return path.normalize(`${process.cwd()}/downloads/${pathToFile}`);
}

function getAllLinks (currentUrl, body) {
    let urls = getUrls(body);
    let urlObject = url.parse(currentUrl);
    
    return Array.from(urls).filter((current) => {
        return current.indexOf(urlObject.host) !== -1;
    });
}

module.exports = {
    urlToFileName,
    getAllLinks
};