import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if a `string` matches a `RegExp` or another `string`.
 *
 * @param result - A `RegExp` or `string`.
 *   If `result` is a `string`, it is converted to a `RegExp`.
 * @returns `Confirm`; a function that takes the `string` passed to `expect`
 *   and checks if it matches `result`.
 * @example
 * expect('Test', toMatch('T')); // PASSED
 * expect('Test', toMatch('E')); // PASSED
 */
const toMatch: Assert = (result) => (expectation) => {
  const regex =
    result instanceof RegExp
      ? (result as RegExp)
      : new RegExp(result as string);

  const passed = regex.test(expectation as string);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not match ${
        result instanceof RegExp ? toString(result) : `${toString(result)}`
      }`
    };
  }
};

export default toMatch;
