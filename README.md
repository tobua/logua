<p align="center">
  <img src="https://github.com/tobua/logua/raw/master/logo.png" alt="logua" width="300">
</p>

# logua

Logging utility for node. Displays colored package namespace in front and exits on error. Dot and newline at the end of every message.

```js
import log from 'logua'

log(`Found ${files} files`)

// => my-pkg Found 5 files.

log('Please add a description field', 'warning')

// => my-pkg Please add a description field.

log('package.json file is missing', 'error')

// => my-pkg package.json file is missing.
// => exits the process!
```

configure the name and color in your `package.json`

```json
{
  "name": "my-pkg",
  "color": "red"
}
```

Available colors can be found in the [chalk](https://www.npmjs.com/chalk) package.

## configure

```js
#!/usr/bin/env node

import log, { configure } from 'logua'

configure({
  // Finds the package when run through 'npm init'.
  init: true,
  // Gets the correct package when used locally.
  cwd: false,
  // Optionally set the name and color here instead of getting it from the package.
  name: 'my-package',
  color: 'blue',
})

log('Running this through an init script!')
```
