const copy = require('recursive-copy')
const colors = require('colors/safe')
const options = { overwrite: true, dot: true }

async function generate (source = '', dest = '', message) {
  console.log(
    colors.cyan('The project is being created, wait a few moments please...')
  )

  await copy(source, process.cwd() + `/${dest}`, options, function (error) {
    if (error) console.error('Copy failed: ' + error)
    message()
  })
}

module.exports = { generate }
