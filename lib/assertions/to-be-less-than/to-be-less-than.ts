import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if one number is less than another.
 *
 * @param result - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is less than `result`.
 * @example
 * expect(1, toBeLessThan(2)); // PASSED
 */
const toBeLessThan: Assert = (result: unknown) => (expectation) => {
  if ((expectation as number) < (result as number)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not less than ${toString(result)}`
    };
  }
};

export default toBeLessThan;
