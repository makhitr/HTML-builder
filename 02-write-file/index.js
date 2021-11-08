const fs = require('fs')
const path = require('path')
const process = require('process');
const { stdin, stdout , exit} = process;

const readStream = stdin;
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'))

stdout.write("Please write some text \n")

readStream.on('data', data => {
  
  if (data.toString().trim() === 'exit') {
    console.log('Bye! See you later!')
    process.exit()
  }
  writeStream.write(data);
}) 

process.on('SIGINT', () => {
  console.log('Bye! See you later!');
  process.exit()
});
