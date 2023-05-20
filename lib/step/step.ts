import type { Test, TestHandler } from '../types/test.types.ts';
import {
  createExpectationHandler,
  handleExpectation
} from '../expectation/expectation.ts';
import type { Expect, ExpectationHandler } from '../expectation/expectation.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Step = Test & {
  expectations: Array<ExpectationHandler>;
};

export type StepHandler = TestHandler & {
  addExpectation: Expect;
};

export type StepRunner = (expect: Expect) => void | Promise<void>;

export const createStepHandler = (
  message: string,
  prefix: string
): StepHandler => {
  const step: Step = {
    passed: false,
    message,
    count: {
      passed: 0,
      failed: 0
    },
    time: 0,
    expectations: []
  };

  const getCount = () => {
    step.count = getTestCount(step.count, step.expectations);
    return step.count;
  };

  const getTime = () => {
    step.time = getTestTime(step.time, step.expectations);
    return step.time;
  };

  // TODO: Avoid race conditions in case of concurrency
  const addExpectation: StepHandler['addExpectation'] = (
    expectation,
    assert
  ) => {
    return handleExpectation(expectation, assert, (result, _, time) => {
      const expectationHandler = createExpectationHandler(
        result,
        `${prefix}${PRINT_PREFIX}`,
        time
      );

      step.expectations.push(expectationHandler);

      return {
        finish: ignore
      };
    });
  };

  const finish = () => {
    finishTest({
      getCount,
      getTime,
      subHandlers: step.expectations,
      message: step.message,
      prefix
    });
  };

  return { getCount, getTime, addExpectation, finish };
};

export const handleStep = (
  test: StepRunner,
  createHandler: () => PickRequired<StepHandler, 'finish' | 'addExpectation'>
) => {
  const handler = createHandler();

  const wrapExpectation: Expect = (expectation, confirm) => {
    return handler.addExpectation(expectation, confirm);
  };

  const output = test(wrapExpectation);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

/**
 * Runs a step; a collection of assertions.
 *
 * @param description - Description of the step.
 * @param test - The callback that runs assertions.
 * @returns A promise if `test` is asynchronous, `void` otherwise.
 * @example
 * ```ts
 * // Synchronous
 * const isEven = (num: number) => num % 2 === 0;
 *
 * it('returns true if number is even', (expect) => {
 *   expect(isEven(2), toEqual(true)); // PASSED
 *   // More expect
 * });
 * ```
 *
 * @example
 * ```ts
 * // Asynchronous
 * // Remember to wrap this in an async function if you are using an environment
 * // that does not support top level await.
 * const delay = (timeMilliseconds) => {
 *   return new Promise((resolve) => {
 *     setTimeout(() => resolve(), timeMilliseconds);
 *   });
 * };
 *
 * await it('should delay by 1000ms', async (expect) => {
 *   const time = performance.now();
 *   await delay(1000);
 *   expect(performance.now() - time, toBeGreaterThanOrEqual(1000));
 * });
 * ```
 */
export const it = (
  description: string,
  test: StepRunner
): void | Promise<void> => {
  const wrapHandler = () => createStepHandler(description, '');
  return handleStep(test, wrapHandler);
};
