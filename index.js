import chalk from 'chalk'
import debouncePkg from 'debounce'

const { debounce } = debouncePkg

const log = (message, options) => {
  const namespace = chalk[options.color].bold(options.name)

  // If no other punctuation provided all messages will end like a regular sentence.
  const last = typeof message === 'string' ? message.slice(-1) : '.'
  const end = ['.', '!', '?', '\n'].includes(last) ? '' : '.'
  const newLine = options.newLine ? '\n' : ''

  if (options.type === 'error') {
    console.error(`${namespace} ${chalk.red.bold('Error')} ${message}${end}${newLine}`)
    process.exit(0)
    return
  }

  if (options.type === 'warning') {
    console.warn(`${namespace} ${chalk.rgb(255, 140, 0)('Warning')} ${message}${end}${newLine}`)
    return
  }

  console.log(`${namespace} ${message}${end}${newLine}`)
}

const Groups = new Map()

const groupLog = (singleMessage, options) => {
  const { count } = Groups.get(options.group)
  let { message } = options

  if (count < 2) {
    message = singleMessage
  }

  if (count > 1 && typeof message === 'function') {
    message = message(count)
  }

  Groups.delete(options.group)

  log(message, options)
}

// returns a log(message, type) method with the current context.
// Context for logs will be stored in this scope.
// Reading them from package.json or using global store didn't work.
export const create = (name, color = 'gray', newLine = false) => {
  if (!name) {
    console.error(
      `${chalk.gray.bold('logua')} ${chalk.red.bold(
        'Error'
      )} No name provided to create(name, [color]).`
    )
  }

  return function logMessage(message, options) {
    const defaultOptions = {
      name,
      color,
      type: options,
      newLine,
    }

    if (typeof options === 'object') {
      Object.assign(defaultOptions, options)
    }

    if (typeof options === 'object' && options.group) {
      // Create debounced group function if not yet existing.
      if (!Groups.has(options.group)) {
        Groups.set(options.group, {
          handler: debounce(groupLog, options.timeout || 50),
          count: 1,
        })
      } else {
        Groups.get(options.group).count += 1
      }
      // Call debounced group log method.
      Groups.get(options.group).handler(message, defaultOptions)
      return
    }

    log(message, defaultOptions)
  }
}
