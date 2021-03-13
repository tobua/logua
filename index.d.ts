// Reference: https://www.typescriptlang.org/play
type Type = 'warning' | 'error'
interface IOptions {
  name?: string
  color?: string
  type?: Type
}
export declare const create: (
  name: string,
  color?: string
) => (message: string, options?: Type | IOptions) => void
