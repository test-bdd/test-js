import { assertThrows } from '../../deps.ts';
import type { Confirm } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

export type MayThrow = () => unknown;
// deno-lint-ignore no-explicit-any
export type ErrorConstructor = new (...args: any[]) => Error;

/**
 * Asserts if a given function throws.
 *
 * @param Err - A constructor of an error a given function is expected to throw.
 * @param message - The message the error thrown is expected to have.
 * @returns `Confirm`; a function that takes the function passed to `expect`
 *   and checks if it throws.
 *   If `Err` is provided, it also checks if the error thrown matches `Err`.
 * @example
 * const throwError = () => {
 *   throw new Error();
 * };
 *
 * expect(throwError, toThrow(Error)); // PASSED
 * expect(throwError, toThrow(Error, 'An unknown error occurred')); // FAILED
 */
const toThrow =
  (Err: ErrorConstructor, message?: string): Confirm =>
  (fun) => {
    const passed = useDenoAssertion(assertThrows, [
      fun as MayThrow,
      Err,
      message
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
