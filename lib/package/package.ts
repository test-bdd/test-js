import type { Test, TestHandler } from '../types/test.types.ts';
import { createModuleHandler, handleModule, module } from '../module/module.ts';
import type { ModuleRunner, ModuleHandler } from '../module/module.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Package = Test & {
  modules: Array<ModuleHandler>;
};

export type PackageHandler = TestHandler & {
  addModule: (description: string, moduleRunner: ModuleRunner) => void;
};

export type PackageRunner = (test: typeof module) => void | Promise<void>;

export const createPackageHandler = (
  message: string,
  prefix: string
): PackageHandler => {
  const pack: Package = {
    passed: false,
    message,
    count: {
      passed: 0,
      failed: 0
    },
    time: 0,
    modules: []
  };

  const getCount = () => {
    pack.count = getTestCount(pack.count, pack.modules);
    return pack.count;
  };

  const getTime = () => {
    pack.time = getTestTime(pack.time, pack.modules);
    return pack.time;
  };

  // TODO: Avoid race conditions in case of concurrency
  const addModule: PackageHandler['addModule'] = (
    description,
    moduleRunner
  ) => {
    handleModule(moduleRunner, () => {
      const moduleHandler = createModuleHandler(
        description,
        `${prefix}${PRINT_PREFIX}`
      );

      pack.modules.push(moduleHandler);

      return {
        addSuite: moduleHandler.addSuite,
        finish: ignore
      };
    });
  };

  const finish = () => {
    finishTest({
      getCount,
      getTime,
      subHandlers: pack.modules,
      message: pack.message,
      prefix
    });
  };

  return { getCount, getTime, addModule, finish };
};

export const handlePackage = (
  runPackage: PackageRunner,
  createHandler: () => PickRequired<PackageHandler, 'finish' | 'addModule'>
) => {
  const handler = createHandler();

  const wrapPackage: typeof module = (
    description: string,
    runModule: ModuleRunner
  ) => {
    handler.addModule(description, runModule);
  };

  // @ts-ignore: I don't know what is going on
  const output = runPackage(wrapPackage);

  if (output instanceof Promise) {
    return output.then(() => handler.finish());
  }

  handler.finish();
};

/**
 * Runs a package; a collection of modules.
 * @param description - A description of the package.
 * @param runPackage - A callback that runs modules.
 * @returns A promise if `runPackage` is asynchronous, `void` otherwise.
 */
export const pack = (description: string, runPackage: PackageRunner) => {
  const wrapHandler = () => createPackageHandler(description, '');
  handlePackage(runPackage, wrapHandler);
};
