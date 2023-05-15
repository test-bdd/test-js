import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

/**
 * Asserts if a given value is an element of an array.
 *
 * @param result - A value that maybe an element of an array.
 * @returns `Confirm`; a function that takes the array passed to `expect`
 *   and checks if it contains `result`.
 */
const toContainElement: Assert = (result) => (expectation) => {
  const passed = (expectation as Array<unknown>).indexOf(result) > -1;

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} does not contain ${toString(result)}`
    };
  }
};

export default toContainElement;
