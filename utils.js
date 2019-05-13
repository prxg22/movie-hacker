const wait = (time = 500) => new Promise((res, rej) => setTimeout(res, time))

module.exports = {
  wait,
}
