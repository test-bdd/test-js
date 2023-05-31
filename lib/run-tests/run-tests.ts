import { type FileMatcher, getPaths } from './get-paths.ts';

export type TestModule = Record<string, CallableFunction | TestRunner>;
export type ModuleImporter = (path: string) => Promise<TestModule>;
export type TestRunner = () => Promise<void> | void;

export type Entry = {
  relative: string;
  absolute: string;
};

export type TestRunnerOptions = {
  entry: Entry;
  isMatch: FileMatcher;
  importModule: ModuleImporter;
  getTestRunner: (mod: TestModule) => TestRunner;
};

/**
 * `run.createRelativePaths`.
 * Creates relative paths from absolute paths.
 *
 * @param absolutePaths - Absolute paths for which to create relative paths.
 * @param entry - The entry paths for both the absolute paths and relative paths.
 * @returns An `Array` of relative paths.
 */
export const createRelativePaths = (
  absolutePaths: Array<string>,
  entry: Entry
) => {
  return absolutePaths.map((path) =>
    path.replace(new RegExp(`^${entry.absolute}`), entry.relative)
  );
};

/**
 * `run.createTestRunner`.
 * Creates a function that runs tests.
 *
 * @param options - An object containing the following properties:
 *
 * 1. `entry`: an object specifying the entry points of the test runner.
 * 1. `isMatch`: a function that checks if a file path meets certain conditions.
 * 1. `importModule`: a function that imports the module containing tests.
 * 1. `getTestRunner`: a function that gets the function that runs tests from the imported module.
 * @returns A function that runs the tests. The function doesn't take any parameters
 * and returns a promise that resolves to void or undefined.
 * @example
 * ```ts
 * // Deno
 * import {
 *   run,
 *   type ModuleImporter,
 *   type TestModule,
 *   type TestRunner
 * } from 'https://deno.land/x/testjs/mod.ts';
 *
 * const { createTestRunner, isTSFile } = run;
 * const relative = './src';
 * // Checkout run.getPaths for equivalent in Node
 * const absolute = new URL(relative, import.meta.url).pathname;
 * const entry = { relative, absolute };
 * const importModule: ModuleImporter = (path) => import(path);
 * // Assuming the the test modules export run
 * const getTestRunner = (mod: TestModule): TestRunner => mod.run;
 *
 * const runTSTests = createTestRunner({
 *   entry,
 *   isMatch: isTSFile,
 *   importModule,
 *   getTestRunner
 * });
 *
 * runTSTests();
 * ```
 */
export const createTestRunner =
  (options: TestRunnerOptions): TestRunner =>
  async () => {
    const [subEntry = ''] = Deno.args;
    const { entry, isMatch, importModule, getTestRunner } = options;
    const getMatchingPaths = getPaths(isMatch);
    const absolutePaths = await getMatchingPaths(entry.absolute + subEntry);
    const relativePaths = createRelativePaths(absolutePaths, entry);

    for (const path of relativePaths) {
      const mod = await importModule(path);
      const run = getTestRunner(mod);
      await run?.();
    }
  };

export * from './get-paths.ts';
export type { FileMatcher, PathGetter } from './get-paths.ts';
