import { isTSFile } from './get-paths.ts';
import { createTestRunner, type TestRunner } from './run-tests.ts';

const relative = './demo';
const absolute = new URL(relative, import.meta.url).pathname;

const runTSTests = createTestRunner({
  entry: { absolute, relative },
  isMatch: isTSFile,
  importModule: (path) => import(path),
  getTestRunner: (mod) => mod.run as TestRunner
});

runTSTests();
