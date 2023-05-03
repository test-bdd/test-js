import { readDir } from '../lib/deps.ts';

const run = async (path: string) => {
  const module = await import(path);
  module.default();
};

const isTestFile = (path: string) => path.endsWith('.test.ts');
const isFile = (path: string) => path.includes('.');

const getPaths = async (
  path: string,
  paths: Array<string>
): Promise<Array<string>> => {
  if (isFile(path)) {
    if (isTestFile(path)) {
      paths.push(path);
      return paths;
    } else {
      return paths;
    }
  }

  const dirEntries = readDir(path);

  for await (const entry of dirEntries) {
    if (entry.isFile || entry.isDirectory) {
      paths = await getPaths(`${path}/${entry.name}`, paths);
    }
  }

  return paths;
};

const path = Deno.args[0];
const root = new URL('../', import.meta.url).pathname;
const paths = await getPaths(`${root}${path}`, []);
for (const path of paths) run(path);
