import type { Test, TestHandler } from '../types/test.types.ts';
import { createModuleHandler, handleModule, module } from '../module/module.ts';
import type { ModuleRunner, ModuleHandler } from '../module/module.ts';
import { ignore } from '../utils/functions.ts';
import { PRINT_PREFIX } from '../utils/constants.ts';
import { getTestCount } from '../utils/count.ts';
import { getTestTime } from '../utils/time.ts';
import finishTest from '../utils/finish.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Package<Input> = Test & {
  modules: Array<ModuleHandler<Input>>;
};

export type PackageHandler<Input> = TestHandler & {
  addModule: (description: string, moduleRunner: ModuleRunner<Input>) => void;
};

export type PackageRunner<Input> = (
  test: typeof module
) => void | Promise<void>;

export const createPackageHandler = <Input>(
  message: string,
  prefix: string
): PackageHandler<Input> => {
  const pack: Package<Input> = {
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
  const addModule: PackageHandler<Input>['addModule'] = (
    description,
    moduleRunner
  ) => {
    handleModule(moduleRunner, () => {
      const moduleHandler = createModuleHandler<Input>(
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

export const handlePackage = <Input>(
  runPackage: PackageRunner<Input>,
  createHandler: () => PickRequired<
    PackageHandler<Input>,
    'finish' | 'addModule'
  >
) => {
  const handler = createHandler();

  const wrapPackage: typeof module<Input> = (
    description: string,
    runModule: ModuleRunner<Input>
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

export const pack = <Input>(
  description: string,
  runPackage: PackageRunner<Input>
) => {
  const wrapHandler = () => createPackageHandler<Input>(description, '');
  handlePackage<Input>(runPackage, wrapHandler);
};
