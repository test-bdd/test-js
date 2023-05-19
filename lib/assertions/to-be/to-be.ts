import type { Assert } from '../../types/assert.types.ts';

/**
 * Asserts the referential equality of two values.
 * For primitive values, it has the same functionality as `toEqual`.
 *
 * @param actual - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and compares it to `actual`.
 * @example
 * ```ts
 * const array1 = [1];
 * const array2 = array1;
 * const array3 = [1];
 * const bool = true;
 * expect(array2, toBe(array1)); // PASSED
 * expect(array2, toBe(array3)); // FAILED
 * expect(array2, toBe([1])); // FAILED
 * expect(bool, toBe(true)); // PASSED
 * ```
 */
const toBe: Assert = (actual: unknown) => (expectation) => {
  if (actual === expectation) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${JSON.stringify(expectation)} is not ${JSON.stringify(actual)}`
    };
  }
};

export default toBe;
