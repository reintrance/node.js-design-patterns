const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const filename = req.headers.filename;
    console.log(`Receiving ${filename} file`);

    req.pipe(zlib.createGunzip())
        .pipe(crypto.createCipher('aes192', 'a_shared_secret'))
        .pipe(fs.createWriteStream(filename))
        .on('finist', () => {
            res.writeHead(201, {
                'Content-Type': 'text/plain'
            });
            res.end('Tha\'s it!');
            console.log(`File ${filename} saved`);
        });
});

server.listen(PORT, () => console.log(`Listening port: ${PORT}`));