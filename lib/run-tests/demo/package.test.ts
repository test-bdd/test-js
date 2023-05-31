import { runModule } from './module.test.ts';
import { pack } from '../../package/package.ts';

pack('Number', (mod) => {
  runModule(mod);
  // Run more modules
});
