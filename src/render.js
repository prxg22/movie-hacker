const chalk = require('chalk')
const { wait, waitKey } = require('./utils')

const log = console.log

const renderInput = async (input, prefix = '') => {
  process.stdout.write(prefix)

  const r = async (index = 0) => {
    if (index >= input.length) return log()
    process.stdout.write(input[index])
    await waitKey()
    await r(index + 1)
  }

  await r()
}
const renderOutput = (output) => log(output)

const renderCommand = async ({ type, color, clear, time, prefix: hasPrefix }, command) => {
  if (time) await wait(time)

  const render = {
    input: renderInput,
    output: renderOutput,
  }


  const prefix = hasPrefix && `${chalk.bold.underline.keyword('darkseagreen')('val')}${chalk.keyword('deeppink')('(master)')} ${chalk.keyword('darkseagreen')('$ ')}`
  await render[type || 'output'](chalk.keyword(color || 'white')(command), prefix)
  if (clear) console.clear()

}

const renderBlock = async ({ config, commands }) => {
  const r = async (index = 0) => {
    if (index >= commands.length) return
    await renderCommand(config, commands[index])
    await r(index + 1)
  }

  await r()
}

const renderPatch = async (blocks) => {
  const r = async (index = 0) => {
    if (index >= blocks.length) return
    await renderBlock(blocks[index])
    await waitKey()
    await r(index + 1)
  }

  await r()
}

const render = async (patches) => {
  const r = async (index = 0) => {
    if (index >= patches.length) return
    console.clear()
    await renderPatch(patches[index])
    await waitKey(13)
    await r(index + 1)
  }

  await r()
}

module.exports = render
