import type { AssertVoid } from '../../types/assert.types.ts';

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
