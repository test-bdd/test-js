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
  matches: FileMatcher;
  importModule: ModuleImporter;
  getTestRunner: (mod: TestModule) => TestRunner;
};

/**
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
 *
 * @param options - An object containing the following properties:
 * - `entry`: an object specifying the entry points of the test runner
 *   - `absolute`: the absolute entry point.
 *   - `relative`: the relative entry point.
 * - `matches`: a function that checks if a file path meets certain conditions.
 * - `importModule`: a function that imports the module containing tests.
 * - `getTestRunner`: a function that gets the function that runs tests from the imported module.
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
 * const getTestRunner = (mod: TestModule) => mod.run as TestRunner;
 *
 * const runTSTests = createTestRunner({
 *   entry,
 *   matches: isTSFile,
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
    const { entry, matches, importModule, getTestRunner } = options;
    const getMatchingPaths = getPaths(matches);
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
