import { assertRejects } from '../../deps.ts';
import type { ConfirmAsync } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import { useDenoAssertionAsync } from '../use-deno-assertion/use-deno-assertion.ts';

export type MayReject = () => PromiseLike<unknown>;
// deno-lint-ignore no-explicit-any
export type RejectionConstructor = new (...args: any[]) => Error;

/**
 * Asserts if a given function rejects.
 *
 * @param Err - An constructor that returns an error
 *   a given function is expected to reject with.
 * @param message - A message the error thrown is expected to have.
 * @returns `Confirm`; a function that takes the function passed to `expect`
 *   and checks if it rejects. If `Err` is given, it also checks if the function rejects
 *   with the error returned by `Err`.
 * @example
 * const reject = () => {
 *   return new Promise((_, reject) => reject(new Error('Error occurred')));
 * };
 *
 * expect(reject, toReject()); // PASSED
 * expect(reject, toReject(Error, 'TypeError occurred')); // FAILED
 */
const toReject =
  (Err?: RejectionConstructor, message?: string): ConfirmAsync =>
  async (fun) => {
    const passed = await useDenoAssertionAsync(assertRejects, [
      fun as MayReject,
      Err as RejectionConstructor,
      message
    ]);

    if (passed) {
      return { passed };
    } else {
      return {
        passed: false,
        message: `${toString(fun)} does not reject${
          Err ? ' with ' + toString(Err) : ''
        }`
      };
    }
  };

export default toReject;
