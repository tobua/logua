// Reference: https://www.typescriptlang.org/play
type Type = 'warning' | 'error'
interface IOptions {
  name?: string
  color?: string
  type?: Type
  newLine?: boolean
}
export declare const create: (
  name: string,
  color?: string,
  newLine?: boolean
) => (message: string, options?: Type | IOptions) => void
