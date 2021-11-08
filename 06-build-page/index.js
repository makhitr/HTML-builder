const fs = require('fs')
const path = require('path')
const { readdir } = require('fs/promises');
const fsPromises = require('fs').promises;

const readStream = fs.createReadStream(path.join(__dirname, 'template.html'), { encoding: 'utf8' })

let templateText;

readStream.on('data', data => {
  templateText = data.toString();
})

fs.mkdir(path.join(__dirname, 'project-dist'), () => {
  fs.readdir(path.join(__dirname, "./components"),
    { withFileTypes: true },
    (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          const readStream = fs.createReadStream(path.join(__dirname, './components', file.name))
          readStream.on('data', (data) => {
            templateText = templateText
              .replace(`{{${file.name.slice(0, file.name.lastIndexOf('.'))}}}`, data.toString())
            const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
            writeStream.on('error', function (err) { console.log(err) });
            writeStream.write(templateText)
            writeStream.end();
          })
        })
      }
    })
})

let stylesArray = [];

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
              stylesArray.push(chunk.toString())
              const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
              writeStream.on('error', function (err) { console.log(err) });
              stylesArray.forEach(function (v) { writeStream.write(v + '\n'); });
              writeStream.end();
            })
          }
        }
      })
    }
  })

fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true })
  .then(
    fs.promises.readdir(path.join(__dirname, 'project-dist', 'assets'))
      .then(
        fs.promises.readdir(path.join(__dirname, 'assets'))
          .then(folderNames => {
            for (let folder of folderNames) {
              fsPromises.mkdir(path.join(__dirname, './project-dist', './assets', folder), { recursive: true })
                .then(
                  fs.promises.readdir(path.join(__dirname, 'assets', folder))
                    .then(fileNames => {
                      for (let fileName of fileNames) {
                        fsPromises.copyFile(path.join(__dirname, './assets', folder, fileName), path.join(__dirname, './project-dist', './assets', folder, fileName))
                      }
                    }
                    )
                )
            }
          }
          ))
  )
