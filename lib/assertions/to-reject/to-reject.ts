import { assertRejects } from '../../deps.ts';
import type { ConfirmAsync } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import { useDenoAssertionAsync } from '../use-deno-assertion/use-deno-assertion.ts';

export type MayReject = () => PromiseLike<unknown>;
// deno-lint-ignore no-explicit-any
export type RejectionConstructor = new (...args: any[]) => Error;

const toReject =
  (Err?: RejectionConstructor): ConfirmAsync =>
  async (fun) => {
    const passed = await useDenoAssertionAsync(assertRejects, [
      fun as MayReject,
      Err as RejectionConstructor
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
