const textColors = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  grey: '\x1b[90m',
  redBright: '\x1b[91m',
  greenBright: '\x1b[92m',
  yellowBright: '\x1b[93m',
  blueBright: '\x1b[94m',
  magentaBright: '\x1b[95m',
  cyanBright: '\x1b[96m',
  whiteBright: '\x1b[97m',
  // Custom
  darkOrange: '\x1b[38;5;208m',
  orange: '\x1b[38;5;214m',
}

export type Color = keyof typeof textColors

export const bold = (text: string) => `\x1b[1m${text}\x1b[0m`
export const textColor = (color: Color, text: string) => `${textColors[color]}${text}\x1b[0m`
