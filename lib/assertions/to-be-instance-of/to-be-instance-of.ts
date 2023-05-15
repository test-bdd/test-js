import { assertInstanceOf } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

/**
 * Asserts if a given value is an instance of another value.
 *
 * @param result - A class or constructor.
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is an instance of `result`.
 * @example
 * expect(new Date(), toBeInstanceOf(Date)); // PASSED
 * expect(1000, toBeInstanceOf(Date)) // FAILED
 */
const toBeInstanceOf: Assert = (result) => (expectation) => {
  const passed = useDenoAssertion(assertInstanceOf, [
    expectation,
    result as ObjectConstructor
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not an instance of ${toString(
        result
      )}`
    };
  }
};

export default toBeInstanceOf;
