var spider = require('./spider');
var url = 'https://habrahabr.ru/top';

spider(url, (err) => {
    console.log(err);
});