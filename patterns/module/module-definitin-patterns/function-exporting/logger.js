module.exports = function (message) {
    console.log('info: ' + message);
}

module.exports.verbose = function (message) {
    console.log('verbose: ' + message);
}