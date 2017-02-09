var spider = require('./spider');
var url = 'https://nodejs.org/dist/latest-v6.x/docs/api';

spider(url, 2, (err) => {
    console.log(err);
});