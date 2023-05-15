import type { Assert } from '../../types/assert.types.ts';

/**
 * Asserts the referential equality of two values.
 * For primitive values, it has the same functionality as `toEqual`.
 * @param result - The value to be compared to.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and compares it to `result`.
 */
const toBe: Assert = (result: unknown) => (expectation) => {
  if (result === expectation) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${JSON.stringify(expectation)} is not ${JSON.stringify(result)}`
    };
  }
};

export default toBe;
