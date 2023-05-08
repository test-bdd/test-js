import { assertInstanceOf } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

export type ToBeInstanceOf = (tolerance?: number) => Assert;

const toBeInstanceOf: Assert = (result) => (expectation) => {
  const passed = useDenoAssertion(assertInstanceOf, [
    expectation,
    result as ObjectConstructor
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} is not an instance of ${toString(
        result
      )}`
    };
  }
};

export default toBeInstanceOf;
