export type FileMatches = (path: string) => boolean;
const { readDir } = Deno;
const isFile: FileMatches = (path) => path.includes('.');
export const root = new URL('../lib', import.meta.url).pathname;
export const isTestFile: FileMatches = (path) => path.endsWith('.test.ts');

export const getPaths = async (
  path: string,
  paths: Array<string>,
  matches: FileMatches
): Promise<Array<string>> => {
  if (isFile(path)) {
    if (matches(path)) paths.push(path);
    return paths;
  }

  const dirEntries = readDir(path);

  for await (const entry of dirEntries) {
    if (entry.isFile || entry.isDirectory) {
      paths = await getPaths(`${path}/${entry.name}`, paths, matches);
    }
  }

  return paths;
};
