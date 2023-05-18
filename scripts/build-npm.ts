import { ensureDirSync } from 'https://deno.land/std@0.140.0/fs/ensure_dir.ts';
import { build, emptyDir } from 'https://deno.land/x/dnt@0.35.0/mod.ts';

await emptyDir('./npm');

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    deno: true
  },
  package: {
    // package.json properties
    name: '@test-bdd/test-js',
    version: Deno.args[0],
    description:
      'A testing library for JavaScript that uses behavior-driven development and functional programming.',
    license: 'Apache 2.0',
    repository: {
      type: 'git',
      url: 'git+https://github.com/test-bdd/test-js.git'
    },
    keywords: [
      'testing-library',
      'functional-programming',
      'behavior-driven-development',
      'bdd',
      'typescript',
      'javascript',
      'deno'
    ],
    bugs: {
      url: 'https://github.com/test-bdd/test-js/issues'
    },
    author: {
      name: 'Mishieck Mwale',
      email: 'mishieckdev@gmail.com'
    }
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('LICENSE', 'npm/LICENSE');
    Deno.copyFileSync('README.md', 'npm/README.md');
    const docsDir = new URL('../npm/docs', import.meta.url).pathname;
    ensureDirSync(docsDir);
    Deno.copyFileSync('docs/api.md', 'npm/docs/api.md');
  }
});
