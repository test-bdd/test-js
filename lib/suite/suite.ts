import type { Test, TestHandler } from '../types/test.types.ts';
import { createStepHandler, handleStep, it } from '../step/step.ts';
import type { StepRunner, StepHandler } from '../step/step.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Suite<Input> = Test & {
  steps: Array<StepHandler<Input>>;
};

export type SuiteHandler<Input> = TestHandler & {
  addStep: (description: string, stepRunner: StepRunner<Input>) => void;
};

export type SuiteRunner<Input> = (test: typeof it) => void | Promise<void>;

export const createSuiteHandler = <Input>(
  message: string,
  prefix: string
): SuiteHandler<Input> => {
  const suite: Suite<Input> = {
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
  const addStep: SuiteHandler<Input>['addStep'] = (description, stepRunner) => {
    handleStep(stepRunner, () => {
      const stepHandler = createStepHandler<Input>(
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

export const handleSuite = <Input>(
  runSuite: SuiteRunner<Input>,
  createHandler: () => PickRequired<SuiteHandler<Input>, 'finish' | 'addStep'>
) => {
  const handler = createHandler();

  const wrapStep: typeof it<Input> = (
    description: string,
    runStep: StepRunner<Input>
  ) => {
    handler.addStep(description, runStep);
  };

  // @ts-ignore: I don't know what is going on
  const output = runSuite(wrapStep);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

export const describe = <Input>(
  description: string,
  runSuite: SuiteRunner<Input>
) => {
  const wrapHandler = () => createSuiteHandler<Input>(description, '');
  handleSuite<Input>(runSuite, wrapHandler);
};
