<p align="center">
  <img src="https://github.com/tobua/logua/raw/master/logo.png" alt="logua" width="300">
</p>

# logua

Logging utility for node. Displays colored package namespace in front and exits on error. Unless message ends in ".!?\n" a dot will be added to the end.

```js
import log, { configure } from 'logua'

// Configure name and color before making any calls to log().
configure({ name: 'my-pkg', color: 'blue' })

log(`Found ${files} files`)

// => my-pkg Found 5 files.

log('Please add a description field', 'warning')

// => my-pkg Please add a description field.

log('package.json file is missing', 'error')

// => my-pkg package.json file is missing.
// => exits the process!
```

Available colors can be found in the [chalk](https://www.npmjs.com/chalk) package.
