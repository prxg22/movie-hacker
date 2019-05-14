const Reader = require('./reader')
const { waitKey } = require('./utils')

String.prototype.isConfig = function () { return /^{["\w\s:,]+}$/.test(this) }
String.prototype.isNewPatch = function () { return this.toString() === '' }

const parse = async (scriptPath = '') => {
  const rd = Reader(scriptPath)
  const patches = []
  let patch = []
  let block

  const parseConfig = (line) => line && JSON.parse(line)

  const Block = (config) => {
    const aux = block
    block = config && { config, commands: [] }
    if (aux) patch.push(aux)
  }

  const Patch = () => {
    Block()
    patches.push(patch)
    patch = []
  }

  return new Promise(async (res, rej) => {
    rd.on('line', (line) => {
      if (line.isNewPatch()) return Patch()
      if (line.isConfig()) return Block(parseConfig(line))

      return block.commands.push(line)
    })

    rd.on('close', () => {
      Patch()
      res(patches)
    })
  })
}

module.exports = parse

// [ [ { config, commands: [] } ], [ { config, commands } ] ]
