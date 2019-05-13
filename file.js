const fs = require('fs')
const readline  = require('readline')

const readLine = (path) => readline.createInterface({
  input: fs.createReadStream(path)
});

const lineType = (line) => line[0] === '$'
  ? 'command'
  : (line[0] === '+' ? 'answer' : undefined)


module.exports = {
  readLine,
  lineType,
}
