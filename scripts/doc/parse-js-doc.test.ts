import parseJSDoc from './parse-js-doc.ts';

const result = parseJSDoc(`
/*
 * Checks if a number is even.
 *
 * @param {number} num - The number to be checked.
 * @returns \`true\` if \`num\` is even, \`false\` otherwise.
 *   Note: 0 is considered to be even.
 * @example
 * console.log(isEven(2)); // true
 * @example
 * console.log(isEven(0)); // true
 */
`);

console.log(JSON.stringify(result, undefined, 2));
