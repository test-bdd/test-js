export type TagName = 'param' | 'returns' | 'example' | 'typedef'; // and more

export type Lines = Array<string>;

export type Tag = {
  name: TagName;
  elements: Array<Lines>; // Where each element `Lines` represents an instance of a tag
};

export type JSDoc = {
  description: Lines;
  tags: Array<Tag>;
};

const parseJSDoc = (jsdoc: string): JSDoc => {
  const lines = jsdoc
    .trimEnd()
    .substring(0, jsdoc.length - 2) // Remove the last */
    .split('\n')
    .map((line) => line.trim());

  const description: Lines = [];
  const tags: Array<Tag> = [];
  let currentTag: Tag | null = null;

  for (const line of lines) {
    if (!line.startsWith('*')) continue;
    const trimmedLine = line.slice(1).trim();

    if (trimmedLine.startsWith('@')) {
      const tagMatch = trimmedLine.match(/^@(\w+)/);
      if (tagMatch) {
        const tagName = tagMatch[1] as TagName;
        const tagContent = trimmedLine.slice(tagMatch[0].length).trim();

        if (currentTag && currentTag.name === tagName) {
          currentTag.elements.push([tagContent]);
        } else {
          currentTag = {
            name: tagName,
            elements: [[tagContent]]
          };
          tags.push(currentTag);
        }
      } else {
        currentTag = null;
      }
    } else if (currentTag) {
      currentTag.elements[currentTag.elements.length - 1].push(trimmedLine);
    } else {
      description.push(trimmedLine);
    }
  }

  return { description, tags };
};

export default parseJSDoc;
