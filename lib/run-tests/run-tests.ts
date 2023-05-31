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

export const createRelativePaths = (
  absolutePaths: Array<string>,
  entry: Entry
) => {
  return absolutePaths.map((path) =>
    path.replace(new RegExp(`^${entry.absolute}`), entry.relative)
  );
};

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
