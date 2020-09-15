import { create } from '../index'

const console = jest.spyOn(global.console, 'log')

// No actual exit on error.
const exit = jest.spyOn(process, 'exit').mockImplementation(() => {})

const getLastLogMessage = () =>
  console.mock.calls[console.mock.calls.length - 1][0]

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
  expect(getLastLogMessage().includes(message)).toBeTruthy()
})

test('Namespace is output.', () => {
  const log = create('hello', 'red')

  log('Is there a namespace?')
  expect(getLastLogMessage().includes('hello')).toBeTruthy()
})

test('Namespace can be adapted per message.', () => {
  const log = create('hallo', 'green')

  log('Is there a namespace?', { name: 'hoi' })
  expect(getLastLogMessage().includes('hoi')).toBeTruthy()
})

test('Type can be set as string for warning and error.', () => {
  const log = create('hoi', 'blue')

  log(`What's this?`, 'warning')
  expect(getLastLogMessage().includes('Warning')).toBeTruthy()
  // Will process.exit on 'error'
  expect(exit).not.toHaveBeenCalled()
  log(`This shouldn't have happened, right?`, 'error')
  expect(getLastLogMessage().includes('Error')).toBeTruthy()
  expect(exit).toHaveBeenCalled()
})

test('Type can be set as object.', () => {
  const log = create('hello', 'red')

  log('Only testing one option', { type: 'warning' })
  expect(getLastLogMessage().includes('Warning')).toBeTruthy()
})

test('Punctuation is adapted properly.', () => {
  const log = create('hallo', 'green')

  log('Will add period')
  expect(getLastLogMessage().includes('Will add period.')).toBeTruthy()
  log('Waiting...')
  expect(getLastLogMessage().includes('Waiting...')).toBeTruthy()
  expect(getLastLogMessage().includes('Waiting....')).toBeFalsy()
  log('Question?')
  expect(getLastLogMessage().includes('Question?')).toBeTruthy()
  expect(getLastLogMessage().includes('Question?.')).toBeFalsy()
})
