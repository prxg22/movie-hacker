const fs = require('fs')
const { wait } = require('./utils')
const { readLine, lineType } = require('./file')

const parseLine = (line) => {
  const [type, txt, config] = line.split('||').map(l => l.trim())
  const [time, color = 'red', breakline = '0'] = config. split(' ')

  return {
    txt,
    type: lineType(type),
    config: { time, color, breakline}
  }
}

const parseFile = async (path) => {
  // ler o arquivo por linha
  const reader = readLine(path)
  let commands = []

  for await (const line of reader) {
    commands = [...commands, parseLine(line)]
  }

  return commands
}

const parse = async (scriptPath = '') => ({
  patches: await parseFile(scriptPath),
})

module.exports = parse
