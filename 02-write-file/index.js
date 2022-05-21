const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;
const pathMyFile = path.join(__dirname, 'mytext.txt');

fs.writeFile( pathMyFile, '', (err) => {
        if (err) throw err;
    }
);

stdout.write('Введите текст (для завершения нажмите "Ctrl+C" или наберите exit):\n');
stdin.on('data', data => {
  const myBuffer = Buffer.from(data, 'utf-8').toString().trim();
  if (myBuffer === 'exit') process.exit();
  fs.appendFile(pathMyFile, data, err => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => process.exit(0));
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));