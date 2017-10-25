const Chance = require('chance');

const PORT = 3000;

const chance = new Chance();

require('http').createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  function generateMore () {
    console.log('genmore');
    while (chance.bool({likelihood: 95})) {
      let chunk = chance.string({length: 16 * 1024 - 1});
      let shouldContinue = res.write(chunk + '\n');

      if (!shouldContinue) {
        console.log('Backpressure!');
        return res.once('drain', generateMore);
      }
    }
    res.end('\nThe end!\n');
  }

  generateMore();

  res.on('finish', () => console.log('All data was sent!'));
}).listen(PORT, () => console.log(`Listening to port: ${PORT}`));