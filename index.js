import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import chalk from 'chalk'

let color = 'gray'
let name = 'log'

try {
  // __dirname is missing with ES modules.
  // https://stackoverflow.com/a/62892482/3185545
  const sourcePackagePath = join(
    dirname(fileURLToPath(import.meta.url)),
    '../..'
  )

  const packageJson = JSON.parse(
    readFileSync(join(sourcePackagePath, 'package.json'))
  )

  if (packageJson.name) {
    name = packageJson.name
  }

  if (packageJson.color) {
    color = packageJson.color
  }
} catch (_) {
  // Using defaults.
}

export default (message, type) => {
  const namespace = chalk[color].bold(name)

  if (type === 'error') {
    // eslint-disable-next-line no-console
    console.log(`${namespace} ${chalk.red.bold('Error')} ${message}.\n`)
    process.exit(0)
    return
  }

  if (type === 'warning') {
    // eslint-disable-next-line no-console
    console.log(
      `${namespace} ${chalk.rgb(255, 140, 0)('Warning')} ${message}.\n`
    )
    return
  }

  // eslint-disable-next-line no-console
  console.log(`${namespace} ${message}.\n`)
}
