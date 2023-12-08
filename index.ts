import debounce from 'debounce'
import { textColor, bold, Color } from './ansi'

export type { Color }

type Type = 'warning' | 'error'

export interface Options {
  name?: string
  color?: Color
  type?: Type
  newLine?: boolean
  group?: string | number
  groupMessage?: ((count: number) => string) | string
  timeout?: number
}

const log = (
  message: string,
  options: { name: string; color: Color; type?: Type; newLine: boolean },
) => {
  const namespace = textColor(options.color, bold(options.name))

  // If no other punctuation provided all messages will end like a regular sentence.
  const last = typeof message === 'string' ? message.slice(-1) : '.'
  const end = ['.', '!', '?', '\n'].includes(last) ? '' : '.'
  const newLine = options.newLine ? '\n' : ''

  if (options.type === 'error') {
    console.error(`${namespace} ${textColor('red', bold('Error'))} ${message}${end}${newLine}`)
    if (typeof process !== 'undefined') {
      process.exit(0)
    } else {
      throw new Error(message)
    }
    return // Necessary for tests.
  }

  if (options.type === 'warning') {
    console.warn(`${namespace} ${textColor('darkOrange', 'Warning')} ${message}${end}${newLine}`)
    return
  }

  console.log(`${namespace} ${message}${end}${newLine}`)
}

const Groups = new Map<string | number, { handler: Function; count: number }>()

const groupLog = (singleMessage: string, options: Options) => {
  const { count } = Groups.get(options.group)
  let message = options.groupMessage as ((count: number) => string) | string

  if (count < 2) {
    message = singleMessage
  }

  if (count > 1 && typeof message === 'function') {
    message = message(count)
  }

  Groups.delete(options.group)

  log(message as string, options as any)
}

// returns a log(message, type) method with the current context.
// Context for logs will be stored in this scope.
// Reading them from package.json or using global store didn't work.
export const create = (name: string, color: Color = 'gray', newLine = false) => {
  if (!name) {
    console.error(
      `${textColor('gray', bold('logua'))} ${textColor(
        'red',
        bold('Error'),
      )} No name provided to create(name, color = 'gray', newLine = false).`,
    )
  }

  return function logMessage(message: string, options?: Type | Options) {
    const defaultOptions = {
      name,
      color,
      type: !options || typeof options === 'string' ? (options as Type) : options.type,
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
