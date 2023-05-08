import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';

const toMatch: Assert = (result) => (expectation) => {
  const passed =
    result instanceof RegExp
      ? result.test(expectation as string)
      : result === expectation;

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not match ${
        result instanceof RegExp ? toString(result) : `"${result}"`
      }`
    };
  }
};

export default toMatch;
