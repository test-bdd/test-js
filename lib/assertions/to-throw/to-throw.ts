import { assertThrows } from '../../deps.ts';
import type { AssertOptional } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

export type MayThrow = () => unknown;
// deno-lint-ignore no-explicit-any
export type ErrorConstructor = new (...args: any[]) => Error;

/**
 * Asserts if a given function throws.
 *
 * @param Err - An error a given function is expected to throw.
 * @returns `Confirm`; a function that takes the function passed to `expect`
 *   and checks if it throws.
 *   If `Err` is provided, it also checks if the error thrown matches `Err`.
 */
const toThrow: AssertOptional = (Err) => (fun) => {
  const passed = useDenoAssertion(assertThrows, [
    fun as MayThrow,
    Err as ErrorConstructor
  ]);

  if (passed) {
    return { passed };
  } else {
    return {
      passed: false,
      message: `${toString(fun)} does not throw${
        Err ? ' ' + toString(Err) : ''
      }`
    };
  }
};

export default toThrow;
