import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if one number is greater than or equal to another.
 *
 * @param actual - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is greater than or equal to `actual`.
 * @example
 * ```ts
 * expect(2, toBeGreaterThanOrEqual(1)); // PASSED
 * expect(1, toBeGreaterThanOrEqual(1)); // PASSED
 * ```
 */
const toBeGreaterThanOrEqual: Assert = (actual: unknown) => (expectation) => {
  if ((expectation as number) >= (actual as number)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(
        expectation
      )} is not greater than or equal to ${toString(actual)}`
    };
  }
};

export default toBeGreaterThanOrEqual;
