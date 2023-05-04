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

export type StepHandler<Input> = TestHandler & {
  addExpectation: Expect<Input>;
};

export type StepRunner<Input> = (expect: Expect<Input>) => void | Promise<void>;

export const createStepHandler = <Input>(
  message: string,
  prefix: string
): StepHandler<Input> => {
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
  const addExpectation: StepHandler<Input>['addExpectation'] = (
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

export const handleStep = <Input>(
  test: StepRunner<Input>,
  createHandler: () => PickRequired<
    StepHandler<Input>,
    'finish' | 'addExpectation'
  >
) => {
  const handler = createHandler();

  const wrapExpectation: Expect<Input> = (expectation, confirm) => {
    handler.addExpectation(expectation, confirm);
  };

  const output = test(wrapExpectation);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

export const it = <Input>(description: string, test: StepRunner<Input>) => {
  const wrapHandler = () => createStepHandler<Input>(description, '');
  handleStep<Input>(test, wrapHandler);
};
