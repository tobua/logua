import { test } from 'vitest'
import { bold, textColor } from '../ansi'

test('Visual test to ensure ansi text features work.', () => {
  console.log('Manual (Visual) test for ANSI escape codes!')
  console.log(`Bold: ${bold('bold')}`)
  console.log(`Red: ${textColor('red', 'red')}`)
  console.log(`Combinations: ${textColor('red', bold('red-bold'))}`)
  console.log(`CyanBright: ${textColor('cyanBright', 'cyanBright')}`)
  console.log(`Warning: ${textColor('darkOrange', 'darkOrange')} ${textColor('orange', 'orange')}`)
})
