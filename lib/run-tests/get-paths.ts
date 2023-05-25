export type FileMatcher = (path: string) => boolean;
export type PathGetter = (
  path: string,
  paths?: Array<string>
) => Promise<Array<string>>;

const { readDir } = Deno;

const matchFile =
  (regex: RegExp): FileMatcher =>
  (path) => {
    return regex.test(path);
  };

export const isFile = matchFile(/\.[a-zA-Z]+$/);
export const isESFile = matchFile(/[._](test|spec)\.(ts|tsx|js|jsx)$/);
export const isTSFile = matchFile(/[._](test|spec)\.(ts|tsx)$/);
export const isJSFile = matchFile(/[._](test|spec)\.(js|jsx|mjs|cjs)$/);

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
