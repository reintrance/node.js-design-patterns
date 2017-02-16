const spider = require('./spider');
const url = 'http://www.simplehtmlguide.com';

spider(url, (err) => {
    console.log(err);
});