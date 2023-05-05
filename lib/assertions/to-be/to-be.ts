import type { Assert } from '../../types/assert.types.ts';

const toBe: Assert = (result: unknown) => (expectation) => {
  if (result === expectation) {
    return {
      passed: true
    };
  } else {
    return {
      passed: false,
      message: `${JSON.stringify(expectation)} is not ${JSON.stringify(result)}`
    };
  }
};

export default toBe;
