const fs = require('fs');
const path = require('path');
const { stdout } = process;
const myPath = path.join(__dirname, 'secret-folder');

fs.readdir(myPath, (err, list) => {

  if (err) throw err;

  list.forEach(item => {
    fs.stat(path.join(myPath, item), (err, stats) => {
            
      if (err) throw err;
            
      if (stats.isFile()) {
        let sizeFile = Math.ceil(stats.size / 1024);
        let extFile = path.extname(item);
        let nameFile = path.basename(item, extFile);
        stdout.write(`${nameFile} - ${extFile.slice(1)} - ${sizeFile}kb\n`);
      }
    });
  });
});

