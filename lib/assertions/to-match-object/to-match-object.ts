import { assertObjectMatch } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

type Obj = Record<string | number | symbol, unknown>;

const toMatchObject: Assert = (result) => (expectation) => {
  const passed = useDenoAssertion(assertObjectMatch, [
    expectation as Obj,
    result as Obj
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(expectation)} does not match ${toString(result)}`
    };
  }
};

export default toMatchObject;
