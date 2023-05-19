import {
  prettier,
  prettierPlugins
} from 'https://denolib.com/denolib/prettier/prettier.ts';
import { getPaths, isTestFile } from './get-source-files.ts';
import type { FileMatches } from './get-source-files.ts';
import parseJSDoc from './parse-js-doc.ts';
import type { Tag, Lines, TagName } from './parse-js-doc.ts';
import { injectTableOfContents } from './create-table-of-contents.ts';

type TagToMarkdown = (elements: Array<Lines>) => string;
type Fragment = [title: string, content: string];
type JSDocComment = [title: string, content: string];

const { readTextFile, writeTextFile } = Deno;
const root = new URL('../../lib', import.meta.url).pathname;
const outputFile = new URL('../../docs', import.meta.url).pathname + '/api.md';
const isNotTestFile: FileMatches = (path) => !isTestFile(path);
const jsdocRegex =
  /\/\*\*([\s\S]*?)\*\/\s+(?:export\s+)?(?:const|let|var)\s+([^\s\:]+)/g;

const getJSDocComments = (file: string): Array<JSDocComment> => {
  const comments: Array<JSDocComment> = [];
  let match;

  while ((match = jsdocRegex.exec(file)) !== null) {
    comments.push([match[2], match[1]]);
  }

  return comments;
};

const jsdocCommentsFound = (comments: Array<JSDocComment>) =>
  comments.length > 0;

const writeMarkdownFile = async (filename: string, markdown: string) => {
  await writeTextFile(filename, markdown);
};

const createDescriptionMarkdown = (lines: Lines) => lines.join('\n');

const createParameterMarkdown: TagToMarkdown = (parameters) => {
  const heading = '### Parameters';

  const body = parameters
    .map((parameter) => {
      let markdown = parameter[0].replace(
        /^([^-\s]+)\s*\-/,
        (_, name) => `- \`${name}\`:`
      );

      if (parameter.length > 1) markdown += parameter.slice(1).join('\n');
      return markdown;
    })
    .join('\n');

  return [heading, body].join('\n\n');
};

const createReturnValueMarkdown: TagToMarkdown = (returnValue) => {
  const heading = '### Return Value';
  const body = returnValue[0].join('\n');
  return [heading, body].join('\n\n');
};

const getExampleNumber = (() => {
  let exampleNumber = 0;

  return () => {
    exampleNumber++;
    return exampleNumber;
  };
})();

const codeReplacer = (_: string, code: string) => {
  return `\`\`\`ts\n${formatTSCode(code).trimEnd()}\n\`\`\``;
};

const createExampleMarkdown: TagToMarkdown = (examples) => {
  const exampleNumber = getExampleNumber();
  const heading = `### Examples ${exampleNumber}`;

  const body = examples
    .map((example, index) => {
      const heading = `#### Example ${exampleNumber}-${index + 1}`;
      const description = example[0];
      const codeRegex = /```ts([\s\S]+)```/;

      const code = example
        .slice(1)
        .filter((line) => /\S+/.test(line))
        .join('\n')
        .replace(codeRegex, codeReplacer)
        .trimEnd();

      return (
        description ? [heading, description, code] : [heading, code]
      ).join('\n\n');
    })
    .join('\n\n');

  return [heading, body].join('\n\n');
};

const tagHandler: { [tag in TagName]: TagToMarkdown } = {
  param: createParameterMarkdown,
  returns: createReturnValueMarkdown,
  example: createExampleMarkdown,
  typedef: () => ``
};

const formatTSCode = (code: string) => {
  return prettier.format(code, {
    parser: 'babel',
    plugins: prettierPlugins
  });
};

const createTagMarkdown = (tags: Array<Tag>) => {
  return tags
    .map(({ name, elements }) => tagHandler[name](elements))
    .join('\n\n');
};

const jsdocToMarkdown = (title: string, jsdoc: string) => {
  const { description, tags } = parseJSDoc(jsdoc);

  return [
    `## \`${title}\``,
    createDescriptionMarkdown(description),
    createTagMarkdown(tags)
  ].join('\n\n');
};

const convertJSDocToMarkdown = async (
  filePaths: Array<string>,
  outputFile: string
) => {
  let jsDocFragments: Array<Fragment> = [];

  for (const path of filePaths) {
    const content = await readTextFile(path);
    const jsdocComments = getJSDocComments(content);
    if (!jsdocCommentsFound(jsdocComments)) continue;

    for (const [title, content] of jsdocComments) {
      jsDocFragments.push([title, content]);
    }
  }

  jsDocFragments = jsDocFragments.sort(([title1], [title2]) => {
    if (title1 > title2) return 1;
    else if (title1 < title2) return -1;
    else return 0;
  });

  const heading = '# API';

  const body = jsDocFragments
    .map(([title, content]) => jsdocToMarkdown(title, content))
    .join('\n\n');

  const markdown = [heading, body].join('\n\n');
  await writeMarkdownFile(outputFile, injectTableOfContents(markdown));
};

const run = async () => {
  const paths = await getPaths(root, [], isNotTestFile);
  await convertJSDocToMarkdown(paths, outputFile);
};

run();
