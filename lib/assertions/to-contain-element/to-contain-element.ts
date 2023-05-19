import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if a given value is an element of an array.
 *
 * @param actual - A value that maybe an element of an array.
 * @returns `Confirm`; a function that takes the array passed to `expect`
 *   and checks if it contains `actual`.
 * @example
 * ```ts
 * // With a primitive
 * expect([1], toContainElement(1)); // PASSED
 * ```
 * @example
 * ```ts
 * // With an object
 * const obj = { name: 'Test' };
 * expect([obj], toContainElement(obj)); // PASSED
 * ```
 */
const toContainElement: Assert = (actual) => (expectation) => {
  const passed = (expectation as Array<unknown>).indexOf(actual) > -1;

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} does not contain ${toString(actual)}`
    };
  }
};

export default toContainElement;
