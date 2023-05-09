import type { Test, TestHandler } from '../types/test.types.ts';
import { createStepHandler, handleStep, it } from '../step/step.ts';
import type { StepRunner, StepHandler } from '../step/step.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Suite = Test & {
  steps: Array<StepHandler>;
};

export type SuiteHandler = TestHandler & {
  addStep: (description: string, stepRunner: StepRunner) => void;
};

export type SuiteRunner = (test: typeof it) => void | Promise<void>;

export const createSuiteHandler = (
  message: string,
  prefix: string
): SuiteHandler => {
  const suite: Suite = {
    passed: false,
    message,
    count: {
      passed: 0,
      failed: 0
    },
    time: 0,
    steps: []
  };

  const getCount = () => {
    suite.count = getTestCount(suite.count, suite.steps);
    return suite.count;
  };

  const getTime = () => {
    suite.time = getTestTime(suite.time, suite.steps);
    return suite.time;
  };

  // TODO: Avoid race conditions in case of concurrency
  const addStep: SuiteHandler['addStep'] = (description, stepRunner) => {
    handleStep(stepRunner, () => {
      const stepHandler = createStepHandler(
        description,
        `${prefix}${PRINT_PREFIX}`
      );

      suite.steps.push(stepHandler);

      return {
        addExpectation: stepHandler.addExpectation,
        finish: ignore
      };
    });
  };

  const finish = () => {
    finishTest({
      getCount,
      getTime,
      subHandlers: suite.steps,
      message: suite.message,
      prefix
    });
  };

  return { getCount, getTime, addStep, finish };
};

export const handleSuite = (
  runSuite: SuiteRunner,
  createHandler: () => PickRequired<SuiteHandler, 'finish' | 'addStep'>
) => {
  const handler = createHandler();

  const wrapStep: typeof it = (description: string, runStep: StepRunner) => {
    handler.addStep(description, runStep);
  };

  // @ts-ignore: I don't know what is going on
  const output = runSuite(wrapStep);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

/**
 * Runs a test suite; a collection of steps.
 * @param description - A description of the test suite.
 * @param runSuite - A callback that runs steps.
 * @returns A promise if `runSuite` is asynchronous, `void` otherwise.
 */
export const describe = (description: string, runSuite: SuiteRunner) => {
  const wrapHandler = () => createSuiteHandler(description, '');
  handleSuite(runSuite, wrapHandler);
};
