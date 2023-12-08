import { test, expect, vi } from 'vitest'
import stripAnsi from 'strip-ansi'
import { create } from '../index'

// @ts-ignore
global.console.new = global.console.log

const messages: string[] = []

const console = vi
  .spyOn(global.console, 'log')
  .mockImplementation((message) => messages.push(message))
const consoleWarn = vi
  .spyOn(global.console, 'warn')
  .mockImplementation((message) => messages.push(message))
const consoleError = vi
  .spyOn(global.console, 'error')
  .mockImplementation((message) => messages.push(message))

// No actual exit on error.
const exit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as () => never)

const getLastMessage = () => messages[messages.length - 1]

test('Can create log.', () => {
  const log = create('hello', 'red')
  expect(log).toBeDefined()
})

test('Something is written to console on log.', () => {
  const log = create('hallo', 'green')
  expect(console).not.toHaveBeenCalled()
  log('Hello world')
  expect(console).toHaveBeenCalled()
})

test('Message is output.', () => {
  const log = create('hoi', 'blue')
  const message = 'This is the secret message'

  log(message)
  expect(getLastMessage().includes(message)).toBeTruthy()
})

test('Namespace is output.', () => {
  const log = create('hello', 'red')

  log('Is there a namespace?')
  expect(getLastMessage().includes('hello')).toBeTruthy()
})

test('Namespace can be adapted per message.', () => {
  const log = create('hallo', 'green')

  log('Is there a namespace?', { name: 'hoi' })
  expect(getLastMessage().includes('hoi')).toBeTruthy()
})

test('Type can be set as string for warning and error.', () => {
  const log = create('hoi', 'blue')

  log(`What's this?`, 'warning')
  expect(getLastMessage().includes('Warning')).toBeTruthy()
  expect(consoleWarn).toHaveBeenCalled()
  // Will process.exit on 'error'
  expect(exit).not.toHaveBeenCalled()
  log(`This shouldn't have happened, right?`, 'error')
  expect(getLastMessage().includes('Error')).toBeTruthy()
  expect(consoleError).toHaveBeenCalled()
  expect(exit).toHaveBeenCalled()
})

test('Type can be set as object.', () => {
  const log = create('hello', 'red')

  log('Only testing one option', { type: 'warning' })
  expect(getLastMessage().includes('Warning')).toBeTruthy()
})

test('Punctuation is adapted properly.', () => {
  const log = create('hallo', 'green')

  log('Will add period')
  expect(getLastMessage().includes('Will add period.')).toBeTruthy()
  log('Waiting...')
  expect(getLastMessage().includes('Waiting...')).toBeTruthy()
  expect(getLastMessage().includes('Waiting....')).toBeFalsy()
  log('Question?')
  expect(getLastMessage().includes('Question?')).toBeTruthy()
  expect(getLastMessage().includes('Question?.')).toBeFalsy()
})

test('Additional new-line can be disabled.', () => {
  const log = create('scope', 'green', false)

  log('Will not add additional new-line')
  expect(stripAnsi(getLastMessage())).toEqual('scope Will not add additional new-line.')
  expect(getLastMessage().includes('\n')).toBeFalsy()

  log('Will add additional new-line', { newLine: true })
  expect(stripAnsi(getLastMessage())).toEqual('scope Will add additional new-line.\n')
  expect(getLastMessage().includes('\n')).toBeTruthy()

  const newLineLog = create('scope', 'blue', true)

  newLineLog('Will add additional new-line')
  expect(stripAnsi(getLastMessage())).toEqual('scope Will add additional new-line.\n')
  expect(getLastMessage().includes('\n')).toBeTruthy()

  newLineLog('Will not add additional new-line', { newLine: false })
  expect(stripAnsi(getLastMessage())).toEqual('scope Will not add additional new-line.')
  expect(getLastMessage().includes('\n')).toBeFalsy()
})

test('Proper color types.', () => {
  const log = create('hello', 'red')
  log('Is there a namespace?', { color: 'blue' })

  // @ts-expect-error
  const anotherLog = create('hello', 'missingRed')
  // @ts-expect-error
  anotherLog('Is there a namespace?', { color: 'blueMissing' })
})
