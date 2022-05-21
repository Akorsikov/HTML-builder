const fs = require('fs');
const path = require('path');
const myPathOrig = path.join(__dirname, 'files');
const myPathCopy = path.join(__dirname, 'files-copy');

fs.mkdir( myPathCopy, {recursive: true}, (err) => {
    if (err) throw err;
  });

fs.readdir(myPathCopy, (err, list) => {
  if (err) throw err;

  if (list.length) {
    list.forEach(item => {
      const fileName = path.join(myPathCopy, item);
      fs.unlink(fileName, err => {
        if (err) throw err;
      });
    })
  }
})


fs.readdir(myPathOrig, (err, list) => {
  if (err) throw err;

  list.forEach(item => {
    const origFile = path.join(myPathOrig, item);
    const copyFile = path.join(myPathCopy, item);
    fs.copyFile(origFile, copyFile, err => {
      if (err) throw err;
    });
  });
});