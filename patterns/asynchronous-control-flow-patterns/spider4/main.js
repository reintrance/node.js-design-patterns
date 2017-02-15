var spider = require('./spider');
var url = 'https://habrahabr.ru/top';

spider(url, 2, (err) => {
    console.log(err);
});