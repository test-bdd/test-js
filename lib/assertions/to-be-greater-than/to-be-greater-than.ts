import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if one number is greater than another.
 *
 * @param actual - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is greater than `actual`.
 * @example
 * ```ts
 * expect(2, toBeGreaterThan(1)); // PASSED
 * ```
 */
const toBeGreaterThan: Assert = (actual: unknown) => (expectation) => {
  if ((expectation as number) > (actual as number)) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not greater than ${toString(
        actual
      )}`
    };
  }
};

export default toBeGreaterThan;
