import { assertStringIncludes } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

/**
 * Asserts if a given string contains a given substring.
 *
 * @param actual - A substring that may be contained in another string.
 * @returns `Confirm`; a function that takes the string passed to `expect`
 *   and checks if it contains `actual`.
 * @example
 * expect('Test', toContainString('T')); // PASSED
 * expect('Test', toContainString('E')); // FAILED
 */
const toContainString: Assert = (actual) => (expectation) => {
  const passed = useDenoAssertion(assertStringIncludes, [
    expectation as string,
    actual as string
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not contain "${actual}"`
    };
  }
};

export default toContainString;
