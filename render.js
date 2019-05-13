const chalk = require('chalk')
const log = console.log

const render = ({ patches, keys }) => {
  let currentPatch = 0
  let currentKey = -1

  let currentBuffer = patches
  let currentBlock = currentPatch

  let step = 0

  const toggleBuffer = () => {
    const isPatch = currentBuffer === patches[currentPatch - 1]

    if (isPatch) {
      currentBuffer = keys[currentKey]
    } else {
      currentBuffer = patches[currentPatch]
    }

    step = 0
  }

  const incrementCurrentBlock = () => {
    const isPatch = currentBuffer === patches[currentPatch - 1]

    if (isPatch) {
      currentPatch += 1
    } else {
      currentKey += 1
    }

    currentBlock += 1
  }

  const run = () => {
    do {
      console.log(currentBuffer, currentBlock, step)
      const line = currentBuffer[currentBlock][step]
      const color = line.type === 'command'
        ? chalk.blue
        : chalk.green

      console.log(color(line.txt))
      if (line.breakline) console.log('\n'.repeat(breakline))
      toggleBuffer()
      step += 1
    } while(true)
  }

  run()
}

module.exports = render
