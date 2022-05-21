const fs = require('fs');
const path = require('path');
const projectPath = path.join(__dirname, 'project-dist');
const styleFile = path.join(projectPath, 'style.css');
const assetsSrc = path.join(__dirname, 'assets');
const assetsDst = path.join(projectPath, 'assets');
const stylesPath = path.join(__dirname, 'styles');

fs.mkdir(projectPath, {recursive: true}, (err) => {
    if (err) throw err;
});

fs.mkdir(assetsDst, {recursive: true}, (err) => {
    if (err) throw err;
});

fs.readdir(assetsSrc, (err, list) => {
  if (err) throw err;

  list.forEach(item => {
    const folderSrcPath = path.join(assetsSrc, item);
    const folderDestPath = path.join(assetsDst, item);
    
    fs.mkdir(folderDestPath, {recursive: true}, (err) => {
        if (err) throw err;
    });
    fs.readdir(folderSrcPath, {recursive: true}, (err, list) => {
      if (err) throw err;

      list.forEach(item => {
        const srcFile = path.join(folderSrcPath, item);
        const destFile = path.join(folderDestPath, item)
        fs.copyFile(srcFile, destFile, err => {
            if (err) throw err;
        });
      })
    });
  });
});

fs.writeFile(styleFile, '', (err) => {
    if (err) throw err;
  });
  
  fs.readdir(stylesPath, (err, list) => {
    if (err) throw err;
  
    list.forEach(item => {
      if (path.extname(item).trim() === '.css') {
        const fileName = path.join(stylesPath, item);
        fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          fs.appendFile(styleFile, data, err => {
            if (err) throw err;
          });
        });
      }    
    });
  });

const templateFile = path.join(__dirname, 'template.html');
const componetsPath = path.join(__dirname, 'components');
fs.readFile(templateFile, {encoding: 'utf-8'}, (err, string) => {
  if (err) throw err;

  fs.readdir(componetsPath, (err, list) => {
    if (err) throw err;

    list.forEach(item => {
      let newContent = '0';
      const extFile = path.extname(item);
      const nameFile = path.basename(item, extFile);
      const templateName = '{{' + nameFile + '}}';
      fs.readFile(path.join(componetsPath, item), {encoding: 'utf-8'}, (err, subString) => {
        if (err) throw err;
        string = string.replace(templateName, subString);        
        fs.writeFile(path.join(projectPath, 'index.html'), string, err => {
          if (err) throw err;
        });
      });
    });
  });  
});