import type { AssertVoid } from '../../types/assert.types.ts';

/**
 * Asserts if a given value is `null` or `undefined`.
 *
 * @returns `Confirm`; a function that takes the value passed to `expect`
 *   and checks if it is `null` or `undefined`.
 * @example
 * ```ts
 * expect(false, toExist()); // PASSED
 * expect(null, toExist()); // FAILED
 * ```
 */
const toExist: AssertVoid = () => (expectation) => {
  const exists = expectation !== undefined && expectation !== null;

  if (exists) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${JSON.stringify(expectation)} does not exist`
    };
  }
};

export default toExist;
