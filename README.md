<p align="center">
  <img src="https://github.com/tobua/logua/raw/main/logo.png" alt="logua" width="300">
</p>

# logua

Logging utility for node and the browser. Displays colored package namespace in front and exits on error. Unless message ends in ".!?\n" a dot will be added to the end.

```js
import { create } from 'logua'

// First create the log with the package context.
const log = create('my-pkg', 'blue')

log(`Found ${files} files`)

// => my-pkg Found 5 files.

log('Please add a description field', 'warning')

// => my-pkg Please add a description field.

log('package.json file is missing', 'error')

// => my-pkg package.json file is missing.
// => exits the process!
```

Available colors can be found in the [chalk](https://www.npmjs.com/chalk) package.

## Separate file

```js
// log.js

import { create } from 'logua'

export const log = create('some-pkg', 'red')
```

Then import the contextualized log:

```js
import { log } from './log.js'

log('Hello World')

// => some-pkg Hello World.
```

## Grouping messages

To avoid spamming the log messages can be grouped. After a timeout a single message will be output instead of various messages.

```js
const files = ['hello.js', 'world.js', 'more-files.js']

files.forEach((file) =>
  log(`Copying ${file}`, {
    // Some identifier for the group.
    group: 'copy',
    // Group message, used if there is more than one log for this id during the timeout.
    groupMessage: (count: number) => `Copying ${count} files`,
    groupMessage: 'Files copied successfully',
    // Optional timeout until messages are collected.
    timeout: 100,
  }),
)

// => Copying 3 files.
```

## Further Options

By default a newline will be added after each message. This can be changed globally or for each single log.

```js
const log = create('my-pkg', 'blue', false) // newLine = false

log('Hello World', { newLine: true }) // Force newLine for this message.
```
