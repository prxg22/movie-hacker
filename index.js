const parse = require('./src/parse')
const render = require('./src/render')
const { SCRIPT_PATH } = require('./constants')

const run = async () => {
  try {
    const patches = await parse(SCRIPT_PATH)
    return render(patches)
  } catch(e) {
    console.error('ERROR: ', e || 'system error try later')
  }
}

run()
