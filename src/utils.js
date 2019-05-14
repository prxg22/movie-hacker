const dec2hexString = (dec) => '0x' + (dec+0x10000).toString(16).substr(-4).toUpperCase();

const wait = (time = 500) => new Promise((res, rej) => setTimeout(res, time))

const waitKey = (key) => new Promise(res => {
  function isKey(name) {
    const pressed = parseInt(name, 16)

    const exit = (e) => {
      process.stdin.removeListener('data', isKey)
      process.stdin.pause()
      if (e) {
        process.exit()
        return rej()
      }
      return res()
    }

    if (pressed === key || !key || key === 3) exit(pressed === 3)
  }

  process.stdin.addListener('data', isKey)

  process.stdin.setEncoding('hex');
  process.stdin.setRawMode(true)
  process.stdin.resume();
})

module.exports = {
  wait,
  waitKey,
  dec2hexString
}
