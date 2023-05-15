import { assertStringIncludes } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

/**
 * Asserts if a given string contains a given substring.
 *
 * @param result - A substring that may be contained in another string.
 * @returns `Confirm`; a function that takes the string passed to `expect`
 *   and checks if it contains `result`.
 * @example
 * expect('Test', toContainString('T')); // PASSED
 * expect('Test', toContainString('E')); // FAILED
 */
const toContainString: Assert = (result) => (expectation) => {
  const passed = useDenoAssertion(assertStringIncludes, [
    expectation as string,
    result as string
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not contain "${result}"`
    };
  }
};

export default toContainString;
