export type FileMatcher = (path: string) => boolean;
export type PathGetter = (
  path: string,
  paths?: Array<string>
) => Promise<Array<string>>;

const { readDir } = Deno;
export const isFile = (path: string) => /\.[a-zA-Z]+$/.test(path);
export const isESFile: FileMatcher = (path) => /\.(ts|tsx|js|jsx)$/.test(path);
export const isTSFile: FileMatcher = (path) => /\.(ts|tsx)$/.test(path);
export const isJSFile: FileMatcher = (path) => /\.(js|jsx|mjs|cjs)$/.test(path);

export const getPaths = (matches: FileMatcher): PathGetter => {
  const get: PathGetter = async (path, paths = []) => {
    if (isFile(path)) {
      if (matches(path)) paths.push(path);
      return paths;
    }

    const dirEntries = readDir(path);

    for await (const entry of dirEntries) {
      if (entry.isFile || entry.isDirectory) {
        paths = await get(`${path}/${entry.name}`, paths);
      }
    }

    return paths;
  };

  return get;
};
