import chalk from 'chalk'

let color = 'gray'
let name = 'log'

export const configure = (options) => {
  if (typeof options !== 'object') {
    console.log(
      `${chalk.gray.bold('logua')} ${chalk.red.bold(
        'Error'
      )} No options object provided to configure(options).`
    )
    return
  }

  if (options.name) {
    name = options.name
  }

  if (options.color) {
    color = options.color
  }
}

export default (message, type) => {
  const namespace = chalk[color].bold(name)

  // If no other punctuation provided all messages will end like a regular sentence.
  const last = message.slice(-1)
  const end = ['.', '!', '?', '\n'].includes(last) ? '' : '.'

  if (type === 'error') {
    console.log(`${namespace} ${chalk.red.bold('Error')} ${message}${end}\n`)
    process.exit(0)
    return
  }

  if (type === 'warning') {
    console.log(
      `${namespace} ${chalk.rgb(255, 140, 0)('Warning')} ${message}${end}\n`
    )
    return
  }

  console.log(`${namespace} ${message}${end}\n`)
}
