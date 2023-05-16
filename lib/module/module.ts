import type { Test, TestHandler } from '../types/test.types.ts';
import { createSuiteHandler, handleSuite, describe } from '../suite/suite.ts';
import type { SuiteRunner, SuiteHandler } from '../suite/suite.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Module = Test & {
  suites: Array<SuiteHandler>;
};

export type ModuleHandler = TestHandler & {
  addSuite: (description: string, suiteRunner: SuiteRunner) => void;
};

export type ModuleRunner = (test: typeof describe) => void | Promise<void>;

export const createModuleHandler = (
  message: string,
  prefix: string
): ModuleHandler => {
  const module: Module = {
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
  const addSuite: ModuleHandler['addSuite'] = (description, suiteRunner) => {
    handleSuite(suiteRunner, () => {
      const suiteHandler = createSuiteHandler(
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

export const handleModule = (
  runModule: ModuleRunner,
  createHandler: () => PickRequired<ModuleHandler, 'finish' | 'addSuite'>
) => {
  const handler = createHandler();

  const wrapModule: typeof describe = (
    description: string,
    runSuite: SuiteRunner
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

/**
 * Runs a module; a collection of test suites.
 * @param description - A description of the module.
 * @param runModule - A callback that runs suites.
 * @returns A promise if `runModule` is asynchronous, `void` otherwise.
 * @example
 * // Synchronous
 * module('Math', (describe) => {
 *   describe('isEven', (it) => {
 *     it('should return true for multiples of 2', (expect) => {
 *       expect(isEven(2), toEqual(true));
 *       expect(isEven(1000), toEqual(true));
 *     });
 *
 *     it('should return true for 0', (expect) => {
 *       expect(isEven(0), toEqual(true));
 *     });
 *   });
 * });
 *
 * @example
 * // Asynchronous
 * // Remember to wrap this in an async function if you are using an environment
 * // that does not support top level await.
 * await module('Time', async (describe) => {
 *   // Asynchronous code
 * });
 */
export const module = (description: string, runModule: ModuleRunner) => {
  const wrapHandler = () => createModuleHandler(description, '');
  handleModule(runModule, wrapHandler);
};
