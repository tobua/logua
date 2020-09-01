// Reference: https://www.typescriptlang.org/play
interface IOptions {
  init?: boolean;
  cwd?: boolean;
  name?: string;
  color?: string;
}
export declare const configure: (options: IOptions) => void
declare const _default: (message: string, type?: string) => void
export default _default
