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
    handleExpectation(expectation, assert, (result) => {
      const expectationHandler = createExpectationHandler(
        result,
        `${prefix}${PRINT_PREFIX}`
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
    handler.addExpectation(expectation, confirm);
  };

  const output = test(wrapExpectation);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

/**
 * Runs a step; a collection of assertions.
 * @param description - Description of the step.
 * @param test - The callback that runs assertions.
 * @returns A promise if `test` is asynchronous, `void` otherwise.
 */
export const it = (description: string, test: StepRunner) => {
  const wrapHandler = () => createStepHandler(description, '');
  handleStep(test, wrapHandler);
};
