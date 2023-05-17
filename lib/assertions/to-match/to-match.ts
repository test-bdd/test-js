import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if a `string` matches a `RegExp` or another `string`.
 *
 * @param actual - A `RegExp` or `string`.
 *   If `actual` is a `string`, it is converted to a `RegExp`.
 * @returns `Confirm`; a function that takes the `string` passed to `expect`
 *   and checks if it matches `actual`.
 * @example
 * expect('Test', toMatch('T')); // PASSED
 * expect('Test', toMatch('E')); // PASSED
 */
const toMatch: Assert = (actual) => (expectation) => {
  const regex =
    actual instanceof RegExp
      ? (actual as RegExp)
      : new RegExp(actual as string);

  const passed = regex.test(expectation as string);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not match ${
        actual instanceof RegExp ? toString(actual) : `${toString(actual)}`
      }`
    };
  }
};

export default toMatch;
