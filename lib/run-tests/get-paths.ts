export type PathType = 'file' | 'directory' | 'other';
export type FileMatcher = (path: string) => boolean;
export type PathGetter = (
  path: string,
  paths?: Array<string>
) => Promise<Array<string>>;

const { readDir } = Deno;

const matchFile =
  (regex: RegExp): FileMatcher =>
  path => {
    return regex.test(path);
  };

/**
 * `run.getPathType`.
 * Gets the type of a given path.
 *
 * @param path - The path.
 * @returns `file` if `path` is for a file, `directory` if `path` is for a
 *   directory, `other` if the `path` is other resources, and `Error` if an
 *   error occurred.
 * @example
 * ```ts
 * const file = '/src/main.test.ts';
 * const dir = '/src';
 *
 * console.log(await getPathType(file)); // 'file'
 * console.log(await getPathType(dir)); // 'directory'
 * ```
 */
export const getPathType = async (path: string): Promise<PathType | Error> => {
  try {
    const stat = await Deno.stat(path);
    if (stat.isFile) return 'file';
    else if (stat.isDirectory) return 'directory';
    else return 'other';
  } catch (error) {
    return error;
  }
};

/**
 * `run.isESFile`.
 * Checks if a given path is for an ES (TypeScript or JavaScript) test file.
 * Valid test file extensions are prefixed with `.test`, `_test`, `.spec`, or `_spec`.
 *
 * @param path - The path to a file or directory.
 * @returns `true` if `path` is for an ES file, `false` otherwise.
 * @example
 * ```ts
 * const path = '/src/main.test.ts';
 * console.log(isESFile(path)); // true
 * ```
 */
export const isESFile = matchFile(/[._](test|spec)\.(ts|tsx|js|jsx)$/);

/**
 * `run.isTSFile`.
 * Checks if a given path is for a TypeScript test file.
 * Valid test file extensions are prefixed with `.test`, `_test`, `.spec`, or `_spec`.
 *
 * @param path - The path to a file or directory.
 * @returns A `true` if `path` is for a TypeScript file, `false` otherwise.
 * @example
 * ```ts
 * const path = '/src/main.test.ts';
 * console.log(isTSFile(path)); // true
 * ```
 */
export const isTSFile = matchFile(/[._](test|spec)\.(ts|tsx)$/);

/**
 * `run.isJSFile`.
 * Checks if a given path is for a JavaScript test file.
 * This includes Node.js files such as those having extensions `mjs` and `cjs`.
 * Valid test file extensions are prefixed with `.test`, `_test`, `.spec`, or `_spec`.
 *
 * @param path - The path to a file or directory.
 * @returns A `true` if `path` is for a JavaScript file, `false` otherwise.
 * @example
 * ```ts
 * const path = '/src/main.test.js';
 * console.log(isJSFile(path)); // true
 * ```
 */
export const isJSFile = matchFile(/[._](test|spec)\.(js|jsx|mjs|cjs)$/);

/**
 * `run.getPaths`.
 * Gets all paths in a given directory that match a particular condition.
 *
 * @param isMatch - The function that checks whether the file path
 * meets a particular condition.
 * @returns An `Array` of matching paths.
 * @example
 * ```ts
 * // Deno
 * import { run } from 'https://deno.land/x/testjs/mod.ts';
 * const { getPaths, isTSFile } = run;
 * const dir = new URL('./src', import.meta.url).pathname;
 * const getTSFiles = getPaths(isTSFile);
 * const paths = getTSPaths(dir);
 * console.log(paths); // ['/home/testjs/repos/testjs/src/main.test.ts']
 * ```
 * @example
 * ```ts
 * // Node ES
 * import { fileURLToPath } from 'url';
 * import path, { dirname } from 'path';
 * import { run } from '@test-bdd/testjs';
 * const { getPaths, isTSFile } = run;
 * const currentFilePath = fileURLToPath(import.meta.url);
 * const currentDirPath = dirname(currentFilePath);
 * const dir = path.join(currentDirPath, 'src');
 * const getTSFiles = getPaths(isTSFile);
 * const paths = getTSPaths(dir);
 * console.log(paths); // ['/home/testjs/repos/testjs/src/main.test.ts']
 * ```
 * @example
 * ```ts
 * // Node CommonJS
 * const path = require('path');
 * const { run } = require('@test-bdd/testjs');
 * const { getPaths, isTSFile } = run;
 * const dir = path.join(__dirname, 'src');
 * const getTSFiles = getPaths(isTSFile);
 * const paths = getTSPaths(dir);
 * console.log(paths); // ['/home/testjs/repos/testjs/src/main.test.ts']
 * ```
 */
export const getPaths = (isMatch: FileMatcher): PathGetter => {
  const get: PathGetter = async (path, paths = []) => {
    const pathTypeResult = await getPathType(path);

    if (pathTypeResult instanceof Error) {
      console.error(`Failed to get path type for "${path}"`);
      return paths;
    }

    if (pathTypeResult === 'other') return paths;

    if (pathTypeResult === 'file') {
      if (isMatch(path)) paths.push(path);
      return paths;
    }

    try {
      const dirEntries = readDir(path);

      for await (const entry of dirEntries) {
        if (entry.isFile || entry.isDirectory) {
          paths = await get(`${path}/${entry.name}`, paths);
        }
      }
    } catch (error) {
      console.error(error);
    }

    return paths;
  };

  return get;
};
