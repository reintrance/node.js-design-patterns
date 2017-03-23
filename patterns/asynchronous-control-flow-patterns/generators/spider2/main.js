const spider = require('./spider');
const co = require('co');

co(function* () {
    try {
        yield spider(process.argv[2], 1);
        console.log('Download complete');
    } catch (err) {
        console.log(`Error: ${err}`);
    }
});