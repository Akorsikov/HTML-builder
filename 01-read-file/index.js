const fs = require('fs');
const path = require('path');

const pathTextFile = path.join(__dirname, 'text.txt');
const streamRead = new fs.ReadStream(pathTextFile);

streamRead.on('readable', function() {
  let data = streamRead.read();
  if (data !== null) {
    console.log(data.toString());
  }
});
