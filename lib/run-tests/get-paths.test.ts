import toBe from '../assertions/to-be/to-be.ts';
import toEqual from '../assertions/to-equal/to-equal.ts';
import { describe } from '../suite/suite.ts';
import {
  type FileMatcher,
  getPaths,
  isTSFile,
  isJSFile,
  isESFile
} from './get-paths.ts';

describe('fileMatchers', (it) => {
  const pairs: Array<[FileMatcher, Array<string>]> = [
    [isTSFile, ['ts', 'tsx']],
    [isJSFile, ['js', 'jsx', 'mjs', 'cjs']],
    [isESFile, ['ts', 'tsx', 'js', 'jsx']]
  ];

  const prefixes = ['.', '_'];
  const labels = ['test', 'spec'];

  pairs.forEach(([matchFile, extensions]) => {
    const extensionList = extensions.join("', '");
    const description = `should match test files with extensions '${extensionList}'`;

    it(description, (expect) => {
      for (const prefix of prefixes) {
        for (const label of labels) {
          for (const ext of extensions) {
            expect(matchFile(`module${prefix}${label}.${ext}`), toBe(true));
          }
        }
      }
    });
  });
});

describe('getPaths', async (it) => {
  await it('should return all paths in demo directory', async (expect) => {
    const entry = new URL('demo', import.meta.url).pathname;
    const getTestPaths = getPaths(isTSFile);
    const paths = await getTestPaths(entry);

    ['expectation', 'step', 'suite', 'module', 'package'].forEach(
      (fileName) => {
        expect(
          paths.some((path) => path.endsWith(`${fileName}.test.ts`)),
          toEqual(true)
        );
      }
    );
  });
});
