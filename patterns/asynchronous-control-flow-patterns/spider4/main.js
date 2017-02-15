const spider = require('./spider');
const url = 'https://habrahabr.ru/top';

spider(url, 2, (err) => {
    console.log(err);
});