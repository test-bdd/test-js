import type { Test, TestHandler } from '../types/test.types.ts';
import { createModuleHandler, handleModule, mod } from '../module/module.ts';
import type { ModuleRunner, ModuleHandler } from '../module/module.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Package = Test & {
  mods: Array<ModuleHandler>;
};

export type PackageHandler = TestHandler & {
  addModule: (description: string, modRunner: ModuleRunner) => void;
};

export type PackageRunner = (test: typeof mod) => void | Promise<void>;

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
    mods: []
  };

  const getCount = () => {
    pack.count = getTestCount(pack.count, pack.mods);
    return pack.count;
  };

  const getTime = () => {
    pack.time = getTestTime(pack.time, pack.mods);
    return pack.time;
  };

  // TODO: Avoid race conditions in case of concurrency
  const addModule: PackageHandler['addModule'] = (description, modRunner) => {
    handleModule(modRunner, () => {
      const modHandler = createModuleHandler(
        description,
        `${prefix}${PRINT_PREFIX}`
      );

      pack.mods.push(modHandler);

      return {
        addSuite: modHandler.addSuite,
        finish: ignore
      };
    });
  };

  const finish = () => {
    finishTest({
      getCount,
      getTime,
      subHandlers: pack.mods,
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

  const wrapPackage: typeof mod = (
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
 * Runs a package; a collection of mods.
 * @param description - A description of the package.
 * @param runPackage - A callback that runs mods.
 * @returns A promise if `runPackage` is asynchronous, `void` otherwise.
 * @example
 * // Synchronous
 * pack('Utils', (mod) => {
 *   // mod code
 * });
 *
 * @example
 * // Asynchronous
 * // Remember to wrap this in an async function if you are using an environment
 * // that does not support top level await.
 * await pack('Utils', async (mod) => {
 *   // mod code
 * });
 */
export const pack = (description: string, runPackage: PackageRunner) => {
  const wrapHandler = () => createPackageHandler(description, '');
  handlePackage(runPackage, wrapHandler);
};
