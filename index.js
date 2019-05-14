const parse = require('./src/parse')
const render = require('./src/render')

const run = async () => {
  try {
    const patches = await parse(process.argv[2] || "script.txt")
    return render(patches)
  } catch(e) {
    console.error('ERROR: ', e || 'system error try later')
  }
}

run()
