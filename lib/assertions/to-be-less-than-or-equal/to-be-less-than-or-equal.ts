import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if one number is less than or equal another.
 *
 * @param result - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is less than or equal `result`.
 * @example
 * expect(1, toBeLessThanOrEqual(2)); // PASSED
 * expect(1, toBeLessThanOrEqual(1)); // PASSED
 */
const toBeLessThanOrEqual: Assert = (result: unknown) => (expectation) => {
  if ((expectation as number) <= (result as number)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(
        expectation
      )} is not less than or equal to ${toString(result)}`
    };
  }
};

export default toBeLessThanOrEqual;
