const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const file = process.argv[2];
const pathToCompressed = './compressed';
const filename = path.basename(file);
const compressedFilePath = path.join(pathToCompressed, `${filename}.gz`);



fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(compressedFilePath))
    .on('finish', () => {
        console.log('File successfully compressed');
    });
