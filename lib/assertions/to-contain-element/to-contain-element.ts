import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

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
