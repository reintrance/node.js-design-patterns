const fs = require('fs');
const http = require('http');
const zlib = require('zlib');
const path = require('path');

const file = process.argv[2];
const server = process.argv[3] || 'localhost';

const PORT = 3000;

const options = {
    hostname: server,
    port: PORT,
    path: '/',
    method: 'PUT',
    headers: {
        filename: path.basename(file),
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
    }
};

const req = http.request(options, res => console.log(`Server response: ${res.statusCode}`));

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', () => console.log(`File ${file} successfully sent`));