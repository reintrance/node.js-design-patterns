const RandomStream = require('./randomStream');

const randomStream = new RandomStream();

randomStream.on('readable', () => {
  let chunk;

  while (chunk = randomStream.read()) {
    console.log(`Read from randomStream: ${chunk.toString()}`);
  }
}).on('end', () => console.log('End of data.'));