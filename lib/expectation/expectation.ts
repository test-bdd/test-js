import type { Test, TestHandler } from '../types/test.types.ts';
import type {
  Confirm,
  ConfirmAsync,
  ConfirmResult
} from '../types/assert.types.ts';
import print from '../utils/print.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Expectation = Test;
export type ExpectationHandler = TestHandler;
export type Expect = (input: unknown, assert: Confirm) => void;
export type ExpectationHandlerCreator = (
  result: ConfirmResult,
  prefix?: string,
  time?: number
) => ExpectationHandler;

export const createExpectationHandler: ExpectationHandlerCreator = (
  { passed, message = '' },
  prefix = '',
  time = 0
) => {
  const expectation: Expectation = {
    passed,
    message,
    count: {
      passed: passed ? 1 : 0,
      failed: passed ? 0 : 1
    },
    time
  };

  const finish = () => {
    print({ ...expectation, prefix });
  };

  const getCount = () => expectation.count;
  const getTime = () => expectation.time;

  return { finish, getCount, getTime };
};

export const handleExpectation = (
  expectation: unknown,
  assert: Confirm | ConfirmAsync,
  createExpectationHandler: (
    data: ConfirmResult,
    prefix?: string,
    time?: number
  ) => PickRequired<ExpectationHandler, 'finish'>
) => {
  const timeMilliseconds = performance.now();
  const result = assert(expectation);

  if (result instanceof Promise) {
    return result.then((value) => {
      const handler = createExpectationHandler(
        value,
        '',
        performance.now() - timeMilliseconds
      );
      handler.finish();
    });
  }

  const handler = createExpectationHandler(
    result,
    '',
    performance.now() - timeMilliseconds
  );
  handler.finish();
};

/**
 * Runs an assertion.
 *
 * @param expectation - The known value to assert.
 * @param assert - The function used for assertion.
 * @returns A promise if `assert` is asynchronous, `void` otherwise.
 * @example
 * // Synchronous
 * expect(true, toEqual(true)); // PASSED
 *
 * @example
 * // Asynchronous
 * // Remember to wrap this in an async function if you are using an environment
 * // that does not support top level await.
 * const reject = () => {
 *   return new Promise((_, reject) => reject(new Error()));
 * };
 *
 * await expect(reject, toReject(Error)); // PASSED
 */
export const expect = (
  expectation: unknown,
  assert: Confirm | ConfirmAsync
) => {
  return handleExpectation(expectation, assert, createExpectationHandler);
};
