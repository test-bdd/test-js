import { marked } from 'https://deno.land/x/marked@1.0.1/mod.ts';

const createTableOfContents = (markdown: string) => {
  const tokens = marked.lexer(markdown); // Convert Markdown to tokens
  const headings = tokens.filter((token) => token.type === 'heading');

  let toc = '## Table of Contents\n';

  for (const heading of headings) {
    type KeyOfHeading = keyof typeof heading;
    const depthKey = 'depth' as KeyOfHeading;
    const textKey = 'text' as KeyOfHeading;
    const level = heading[depthKey] as unknown as number;
    const text = heading[textKey] as unknown as string;

    const slug = text
      .toLowerCase()
      .replace(/`/g, '')
      .replace(/[^\w]+/g, '-');
    const indent = '  '.repeat(level - 1);
    toc += `${indent}- [${text}](#${slug})\n`;
  }

  return toc;
};

export const injectTableOfContents = (markdown: string) => {
  const toc = createTableOfContents(markdown);
  const indexOfTableOfContents = markdown.indexOf('##');

  return [
    markdown.substring(0, indexOfTableOfContents),
    toc,
    markdown.substring(indexOfTableOfContents)
  ].join('\n\n');
};
