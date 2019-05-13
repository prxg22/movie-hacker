const parse = require('./parse')
const render = require('./render')
const { SCRIPT_PATH } = require('./constants')

const run = async () => {
  try {
    const commands = await parse(SCRIPT_PATH)
    console.log(commands)
    // render({ keys, patches })
  } catch(e) {
    console.error(e)
  }
}

run()
