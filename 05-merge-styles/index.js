// import { ReadStream } from "fs";

const { readdir } = require('fs/promises');
const path = require('path')
const fs = require('fs')

let filesArray = [];

fs.readdir(path.join(__dirname, "./styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
          if (path.extname(file.name) === ".css") {
            const readStream = fs.createReadStream(path.join(__dirname, './styles', file.name))
            readStream.on('data', (chunk) => {
              filesArray.push(chunk.toString())
              const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
              writeStream.on('error', function (err) { console.log(err) });
              filesArray.forEach(function (v) { writeStream.write(v + '\n'); });
              writeStream.end();
            })
          }
        }
      })
    }
  })
