var spider = require('./spider');
var url = 'http://getbootstrap.com/components';

spider(url, 2, (err) => {
    console.log(err);
});