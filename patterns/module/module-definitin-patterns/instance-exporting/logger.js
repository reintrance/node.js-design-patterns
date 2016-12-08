function Logger (name) {
    // this doesn't guarantee that this value will be the same within one node instance since 
    // different modules that require logger may need different versions of logger hence
    // require will return dirrerent instances for those
    this.count = 0;
    this.name = name;
}

Logger.prototype.log = function (message) {
    this.count++;
    console.log('[' + this.name + '] ' + message);
};

Logger.prototype.info = function (message) {
    this.log('info: ' + message);
};

Logger.prototype.verbose = function (message) {
    this.log('verbose: ' + message);
};

module.exports = new Logger('DEFAULT');
module.exports.Logger = Logger;