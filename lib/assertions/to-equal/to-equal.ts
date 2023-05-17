import { assertEquals } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

const equal = (first: unknown, second: unknown) => {
  try {
    if (typeof first === 'function') {
      return toString(first) === toString(second);
    }

    assertEquals(first, second);
    return true;
  } catch {
    return false;
  }
};

/**
 * Asserts if two values are structurally equal.
 *
 * @param actual - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and compares it to `actual`.
 * @example
 * // With a primitive
 * expect(true, toEqual(true)); // PASSED
 * @example
 * // With an object
 * const obj = { name: 'Test' };
 * expect(obj, toEqual({ name: 'Test' })); // PASSED
 */
const toEqual: Assert = (actual: unknown) => (expectation) => {
  if (equal(actual, expectation)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not equal to ${toString(actual)}`
    };
  }
};

export default toEqual;
