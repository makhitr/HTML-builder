// import { ReadStream } from "fs";

const { readdir } = require('fs/promises');
const path = require('path')
const fs = require('fs')

fs.readdir(path.join(__dirname, "./styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
          if (path.extname(file.name) === ".css") {
            /** */
            const readStream = fs.createReadStream(path.join(__dirname, './styles', file.name))
            const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
           let filesArray = []
            // readStream.pipe(filesArray)
           console.log('%cindex.js line:21 filesArray', 'color: #007acc;', filesArray);

            readStream.on('data', (chunk) => {
              writeStream.write(chunk)
              // console.log(chunk.toString());
            })
            /***/
        

          }
        }
      })
    }
  })
