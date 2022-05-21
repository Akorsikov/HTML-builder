const fs = require('fs');
const path = require('path');
const projectPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const bundleFile = path.join(projectPath, 'bundle.css');


fs.writeFile( bundleFile, '', (err) => {
  if (err) throw err;
});

fs.readdir(stylesPath, (err, list) => {
  if (err) throw err;

  list.forEach(item => {
    if (path.extname(item).trim() === '.css') {
      const fileName = path.join(stylesPath, item);
      fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        fs.appendFile(bundleFile, data, err => {
          if (err) throw err;
        });
      });
    }    
  });
});