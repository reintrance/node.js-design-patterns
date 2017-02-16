const spider = require('./spider');
const url = 'https://www.w3.org';

spider(url, 2, (err) => {
    console.log(err);
});