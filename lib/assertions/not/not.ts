import type { Confirm } from '../../types/assert.types.ts';

/**
 * Inverts the result of an assertion.
 *
 * @param confirm - A callback for assertion.
 * @returns `void`
 */
const not =
  (confirm: Confirm): Confirm =>
  (expectation) => {
    const result = confirm(expectation); // TODO: Consider a case where confirm is async
    const passed = !result.passed;
    const message = passed ? undefined : 'Test failed';
    return { passed, message };
  };

export default not;
