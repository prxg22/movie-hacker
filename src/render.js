const chalk = require('chalk')
const { wait, waitKey } = require('./utils')

const log = console.log
let movePatch = false;

const printPrefix = () =>
  `${chalk.bold.underline.keyword('darkseagreen')('val2291')}${chalk.keyword('deeppink')('(master)')} ${chalk.keyword('darkseagreen')('$ ')}`
const renderInput = async (input, prefix = '') => {
  process.stdout.write(prefix)

  const r = async (index = 0) => {
    if (index >= input.length || movePatch) return log()
    process.stdout.write(input[index])

    await waitKey()
    await r(index + 1)
  }

  await r()
}

const renderOutput = (output) => log(output)

const renderCommand = async ({
  type,
  color,
  clear,
  time,
  prefix: hasPrefix,
}, command) => {
  if (movePatch) return
  const render = {
    input: renderInput,
    output: renderOutput,
  }

  const prefix = hasPrefix && printPrefix()
  await render[type || 'output'](chalk.keyword(color || 'white')(command), prefix)

  if (time) await wait(50)
  if (clear) console.clear()
}

const renderBlock = async ({ config, commands }) => {
  const r = async (index = 0) => {
    if (index >= commands.length || movePatch) return
    await renderCommand(config, commands[index])
    await r(index + 1)
  }

  await r()
  const { timeAfter, breakline, clearAfter } = config
  if (breakline) console.log('\n'.repeat(config.breakline))
  if (timeAfter) await wait(timeAfter)
  if (clearAfter) console.clear()
}

const renderPatch = async (blocks) => {
  const r = async (index = 0) => {
    if (index >= blocks.length || movePatch) return
    await renderBlock(blocks[index])
    await r(index + 1)
  }

  await r()
}

const render = async (patches) => {
  const r = async (index = 0) => {
    if (index >= patches.length) return
    if (index < 0) index = 0

    const moveNPatches = (n = 0) => {
      index += n
      movePatch = true
      process.stdin.removeAllListeners('data')
    }

    waitKey(13) // move on on enter
    .then(async () => moveNPatches())

    waitKey(27) // move back on backspace
    .then(async () => moveNPatches(-2))

    console.clear()
    await renderPatch(patches[index < 0 ? 0 : index])
    movePatch = false
    await r(index + 1)
  }

  await r()
  waitKey(27).then(async () => await r(patches.length - 1))
  await waitKey(13)
}

module.exports = render
