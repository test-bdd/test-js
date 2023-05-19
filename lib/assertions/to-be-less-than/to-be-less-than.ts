import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if one number is less than another.
 *
 * @param actual - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is less than `actual`.
 * @example
 * ```ts
 * expect(1, toBeLessThan(2)); // PASSED
 * ```
 */
const toBeLessThan: Assert = (actual: unknown) => (expectation) => {
  if ((expectation as number) < (actual as number)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not less than ${toString(actual)}`
    };
  }
};

export default toBeLessThan;
