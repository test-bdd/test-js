import type {
  TestHandlerCreator,
  Test,
  TestHandler
} from '../types/test.types.ts';
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
export type ExpectationHandlerCreator = TestHandlerCreator<
  ConfirmResult,
  ExpectationHandler
>;

export const createExpectationHandler: ExpectationHandlerCreator = (
  { passed, message = '' },
  prefix = ''
) => {
  const expectation: Expectation = {
    passed,
    message,
    count: {
      passed: passed ? 1 : 0,
      failed: passed ? 0 : 1
    },
    time: 0
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
    prefix?: string
  ) => PickRequired<ExpectationHandler, 'finish'>
) => {
  const actual = assert(expectation);

  if (actual instanceof Promise) {
    return actual.then((value) => {
      const handler = createExpectationHandler(value);
      handler.finish();
    });
  }

  const handler = createExpectationHandler(actual);
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
