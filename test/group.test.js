import { create } from '../index'

const console = jest.spyOn(global.console, 'log')

const getLastLogMessage = () =>
  console.mock.calls[console.mock.calls.length - 1][0]

jest.useFakeTimers()

test('Logs can be grouped.', () => {
  const log = create('group', 'yellow')
  const message = (count) => `Copying ${count} files`
  log('Copying file Hello.js', {
    group: 1,
    message,
  })
  log('Copying file World.js.', {
    group: 1,
    message,
  })
  log('Copying file Again.js.', {
    group: 1,
    message,
  })

  jest.runAllTimers()

  expect(getLastLogMessage().includes('Copying 3 files')).toBeTruthy()
})

test('Group count is cleared after timeout.', () => {
  const log = create('group', 'red')
  const message = (count) => `Copying ${count} files`
  log('Copying file Hello.js', {
    group: 1,
    message,
  })
  log('Copying file World.js.', {
    group: 1,
    message,
  })
  log('Copying file Again.js.', {
    group: 1,
    message,
  })

  jest.runAllTimers()

  expect(getLastLogMessage().includes('Copying 3 files')).toBeTruthy()

  log('Copying file Hello.js', {
    group: 1,
    message,
  })
  log('Copying file World.js.', {
    group: 1,
    message,
  })

  jest.runAllTimers()

  expect(getLastLogMessage().includes('Copying 2 files')).toBeTruthy()
})

test('Single message will not be grouped.', () => {
  const log = create('group', 'green')
  const message = (count) => `Copying ${count} files`
  log('Copying file Hello.js', {
    group: 1,
    message,
  })

  jest.runAllTimers()

  expect(getLastLogMessage().includes('Copying file Hello.js')).toBeTruthy()
})

test('Different group ids will not be mixed.', () => {
  const log = create('group', 'blue')
  const message = (count) => `Copying ${count} files`
  log('Copying file Hello.js', {
    group: 1,
    message,
  })
  log('Copying file World.js.', {
    group: 2,
    message,
  })
  log('Copying file Again.js.', {
    group: 1,
    message,
  })
  log('Copying file More.js.', {
    group: 2,
    message,
  })

  jest.runAllTimers()

  expect(getLastLogMessage().includes('Copying 2 files')).toBeTruthy()
})
