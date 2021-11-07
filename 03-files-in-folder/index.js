const { readdir } = require('fs/promises');
const path = require('path')
const fs = require('fs')

fs.readdir(path.join(__dirname, "./secret-folder"), 
  { withFileTypes: true },
  (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) { 
        fs.stat(path.join(__dirname, "./secret-folder", file.name), (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {
           console.log(`${path.basename(file.name).slice(0, file.name.lastIndexOf('.'))} - ${ path.extname(file.name).slice(1)} - ${(stats.size / 1024)}kb`);
          }
        });
      }     
    })
  }
})
