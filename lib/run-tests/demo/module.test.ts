import { pack } from '../../package/package.ts';
import { runSuite } from './suite.test.ts';
import { type PackageRunner } from '../../package/package.ts';

export const runModule: PackageRunner = (mod) => {
  mod('Parity', (describe) => {
    runSuite(describe);
    // Run more suites
  });
};

export const run = () => {
  pack('Number', runModule);
};
