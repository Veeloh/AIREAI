const fs = require('fs');

const directoryPath = './images/botjokes';

let numberToName = 1;

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  numberToName = 1;
  files.forEach((file, index) => {
    const oldPath = `${directoryPath}/${file}`;
    const newPath = `${directoryPath}/${numberToName}.mp4`;

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming ${file}:`, err);
      } else {
        console.log(`Renamed ${file} to ${numberToName}.mp4`);
      }
    });

    numberToName++;
  });
});
