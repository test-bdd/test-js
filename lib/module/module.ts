import type { Test, TestHandler } from '../types/test.types.ts';
import { createSuiteHandler, handleSuite, describe } from '../suite/suite.ts';
import type { SuiteRunner, SuiteHandler } from '../suite/suite.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Module<Input> = Test & {
  suites: Array<SuiteHandler<Input>>;
};

export type ModuleHandler<Input> = TestHandler & {
  addSuite: (description: string, suiteRunner: SuiteRunner<Input>) => void;
};

export type ModuleRunner<Input> = (
  test: typeof describe
) => void | Promise<void>;

export const createModuleHandler = <Input>(
  message: string,
  prefix: string
): ModuleHandler<Input> => {
  const module: Module<Input> = {
    passed: false,
    message,
    count: {
      passed: 0,
      failed: 0
    },
    time: 0,
    suites: []
  };

  const getCount = () => {
    module.count = getTestCount(module.count, module.suites);
    return module.count;
  };

  const getTime = () => {
    module.time = getTestTime(module.time, module.suites);
    return module.time;
  };

  // TODO: Avoid race conditions in case of concurrency
  const addSuite: ModuleHandler<Input>['addSuite'] = (
    description,
    suiteRunner
  ) => {
    handleSuite(suiteRunner, () => {
      const suiteHandler = createSuiteHandler<Input>(
        description,
        `${prefix}${PRINT_PREFIX}`
      );

      module.suites.push(suiteHandler);

      return {
        addStep: suiteHandler.addStep,
        finish: ignore
      };
    });
  };

  const finish = () => {
    finishTest({
      getCount,
      getTime,
      subHandlers: module.suites,
      message: module.message,
      prefix
    });
  };

  return { getCount, getTime, addSuite, finish };
};

export const handleModule = <Input>(
  runModule: ModuleRunner<Input>,
  createHandler: () => PickRequired<ModuleHandler<Input>, 'finish' | 'addSuite'>
) => {
  const handler = createHandler();

  const wrapModule: typeof describe<Input> = (
    description: string,
    runSuite: SuiteRunner<Input>
  ) => {
    handler.addSuite(description, runSuite);
  };

  // @ts-ignore: I don't know what is going on
  const output = runModule(wrapModule);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

export const module = <Input>(
  description: string,
  runModule: ModuleRunner<Input>
) => {
  const wrapHandler = () => createModuleHandler<Input>(description, '');
  handleModule<Input>(runModule, wrapHandler);
};
