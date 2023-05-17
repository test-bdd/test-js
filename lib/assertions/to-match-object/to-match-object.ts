import { assertObjectMatch } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

type Obj = Record<string | number | symbol, unknown>;

/**
 * Asserts if an object matches a subset of the properties of another object.
 *
 * @param actual - The object to be matched against.
 * @returns `Confirm`; a function that takes the object passed to `expect`
 *   and checks if it matches `actual`.
 * @example
 * const user = { username: 'johndoe', age: 19 };
 * expect(user, toMatchObject({ username: 'johndoe' })); // PASSED
 */
const toMatchObject: Assert = (actual) => (expectation) => {
  const passed = useDenoAssertion(assertObjectMatch, [
    expectation as Obj,
    actual as Obj
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} does not match ${toString(actual)}`
    };
  }
};

export default toMatchObject;
