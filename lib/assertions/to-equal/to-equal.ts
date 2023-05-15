import { assertEquals } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if two values are structurally equal.
 * @param result - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and compares it to `result`.
 */
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

const toEqual: Assert = (result: unknown) => (expectation) => {
  if (equal(result, expectation)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not equal to ${toString(result)}`
    };
  }
};

export default toEqual;
