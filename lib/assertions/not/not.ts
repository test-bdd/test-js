import type { Confirm } from '../../types/assert.types.ts';

/**
 * Inverts the actual of an assertion.
 *
 * @param confirm - A callback for assertion.
 *   The callback can be returned by other assertion functions like `toEqual`.
 * @returns `void`
 * @example
 * ```ts
 * expect(true, not(toEqual(false))); // PASSED
 * ```
 */
const not =
  (confirm: Confirm): Confirm =>
  (expectation) => {
    const actual = confirm(expectation); // TODO: Consider a case where confirm is async
    const passed = !actual.passed;
    const message = passed ? undefined : 'Test failed';
    return { passed, message };
  };

export default not;
