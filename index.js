import chalk from 'chalk'

const log = (message, options) => {
  const namespace = chalk[options.color].bold(options.name)

  // If no other punctuation provided all messages will end like a regular sentence.
  const last = message.slice(-1)
  const end = ['.', '!', '?', '\n'].includes(last) ? '' : '.'

  if (options.type === 'error') {
    console.log(`${namespace} ${chalk.red.bold('Error')} ${message}${end}\n`)
    process.exit(0)
    return
  }

  if (options.type === 'warning') {
    console.log(
      `${namespace} ${chalk.rgb(255, 140, 0)('Warning')} ${message}${end}\n`
    )
    return
  }

  console.log(`${namespace} ${message}${end}\n`)
}

// returns a log(message, type) method with the current context.
// Context for logs will be stored in this scope.
// Reading them from package.json or using global store didn't work.
export const create = (name, color = 'gray') => {
  if (!name) {
    console.log(
      `${chalk.gray.bold('logua')} ${chalk.red.bold(
        'Error'
      )} No name provided to create(name, [color]).`
    )
  }

  return (message, options) => {
    const defaultOptions = {
      name,
      color,
      type: options,
    }

    if (typeof options === 'object') {
      Object.assign(defaultOptions, options)
    }

    log(message, defaultOptions)
  }
}
