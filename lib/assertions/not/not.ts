import type { Confirm } from '../../types/assert.types.ts';

const not =
  (confirm: Confirm): Confirm =>
  (expectation) => {
    const result = confirm(expectation);
    const passed = !result.passed;
    const message = passed ? undefined : 'Test failed';
    return { passed, message };
  };

export default not;
