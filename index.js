import { readFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'

let color = 'gray'
let name = 'log'

try {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'))
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
    console.log(`${namespace} ${chalk.orange('Warning')} ${message}.\n`)
    return
  }

  // eslint-disable-next-line no-console
  console.log(`${namespace} ${message}.\n`)
}
