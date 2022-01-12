import { CompilerOptions } from 'typescript';

declare type TsConfig = {
    compilerOptions: CompilerOptions;
};
/**
 * If a JSON file is passed in, it will parse that as tsconfig
 * If a non JSON file (directory or TS file) is passed in, it searches up for a tsconfig from there
 */
declare function getTsconfig(searchPath?: string): TsConfig;

export { getTsconfig as default };
