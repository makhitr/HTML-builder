const { constants } = require('fs');
const { copyFile } = require('fs/promises');
const path = require('path')
const fs = require('fs');
const fsPromises = require('fs').promises;

fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true })
.then(function () {
  console.log('Directory created successfully');
})
.catch(function () {
  console.log('failed to create directory');
}
);

fs.promises.readdir(path.join(__dirname, './files-copy'))
.then(filenames => {
  for (let filename of filenames) {
    fsPromises.unlink(path.join(__dirname, 'files-copy', filename))
  }})
  fs.promises.readdir(path.join(__dirname, './files'))
  .then(filenames => {
    for (let filename of filenames) {
      fsPromises.copyFile(path.join(__dirname, './files', filename), path.join(__dirname, './files-copy', filename))
    }
  })
  .catch(err => {
    console.log(err)
  })
