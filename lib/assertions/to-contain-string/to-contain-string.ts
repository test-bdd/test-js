import { assertStringIncludes } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

const toContainString: Assert = (result) => (expectation) => {
  const passed = useDenoAssertion(assertStringIncludes, [
    expectation as string,
    result as string
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `"${expectation}" does not contain "${result}"`
    };
  }
};

export default toContainString;
