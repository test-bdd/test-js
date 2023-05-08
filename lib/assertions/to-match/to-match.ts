import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

const toMatch: Assert = (result) => (expectation) => {
  const regex =
    result instanceof RegExp
      ? (result as RegExp)
      : new RegExp(result as string);

  const passed = regex.test(expectation as string);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not match ${
        result instanceof RegExp ? toString(result) : `${toString(result)}`
      }`
    };
  }
};

export default toMatch;
