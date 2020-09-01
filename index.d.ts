// Reference: https://www.typescriptlang.org/play
interface IOptions {
  name?: string;
  color?: string;
}
export declare const configure: (options: IOptions) => void
declare const _default: (message: string, type?: string) => void
export default _default
