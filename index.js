import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import chalk from 'chalk'

let color = 'gray'
let name = 'log'

const loadConfigurationFromPackage = (basePath) => {
  try {
    const packageJson = JSON.parse(readFileSync(join(basePath, 'package.json')))

    if (packageJson.name) {
      name = packageJson.name
    }

    if (packageJson.color) {
      color = packageJson.color
    }
  } catch (_) {
    // Using defaults.
  }
}

// Best way I found to get the caller and get the configuration from it's package.
// configure() below can be used to make it work for init and local packages.
if (process.env._ && process.env._.includes('/.bin')) {
  loadConfigurationFromPackage(process.env._.replace('/.bin', ''))
} else {
  // CWD as fallback, will not work properly anymore when published.
  loadConfigurationFromPackage(process.cwd())
}

export const configure = (options) => {
  if (typeof options !== 'object') {
    console.log(
      `${chalk.gray.bold('logua')} ${chalk.red.bold(
        'Error'
      )} No options object provided to configure(options).`
    )
    return
  }

  if (options.init) {
    try {
      // __dirname is missing with ES modules.
      // https://stackoverflow.com/a/62892482/3185545
      const dirnameImport = join(
        dirname(fileURLToPath(import.meta.url)),
        // Need to go back to find the package when used with npm init.
        '../..'
      )

      loadConfigurationFromPackage(dirnameImport)
    } catch (_) {
      // Using defaults.
    }
  }

  if (options.cwd) {
    loadConfigurationFromPackage(process.cwd())
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
