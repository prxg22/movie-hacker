const fs = require('fs')
const readline = require('readline')

const reader = (path)  => {
  const rd = readline.createInterface({
    input: fs.createReadStream(path),
  })

  return rd
}


module.exports = reader
