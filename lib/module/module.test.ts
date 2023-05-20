import { format } from '../deps.ts';
import type { ConfirmAsync } from '../types/assert.types.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { mod } from './module.ts';

const testModule = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Module') + '\n');
  const descriptionModule = 'Primitives';
  const descriptionSuite = 'Boolean';
  const descriptionStep = 'should match boolean values';

  const runAsync: ConfirmAsync = () =>
    new Promise((resolve) => resolve({ passed: true }));

  testAndPrint({
    description: 'Module',
    expectedToPass: true,
    message: descriptionModule,
    getResult: () => {
      mod(descriptionModule, (describe) => {
        describe(descriptionSuite, (it) => {
          it(descriptionStep, (expect) => {
            expect(true, () => ({ passed: true }));
          });
        });
      });
    }
  });

  testAndPrint({
    description: 'Module',
    expectedToPass: false,
    message: descriptionModule,
    getResult: () => {
      mod(descriptionModule, (describe) => {
        describe(descriptionSuite, (it) => {
          it(descriptionStep, (expect) => {
            expect(true, () => ({ passed: false, message: failMessage }));
          });
        });
      });
    }
  });

  testAndPrint({
    description: 'Module Async',
    expectedToPass: true,
    message: descriptionModule,
    getResult: async () => {
      await mod(descriptionModule, async (describe) => {
        await describe(descriptionSuite, async (it) => {
          await it(descriptionStep, async (expect) => {
            await expect(true, runAsync);
            await expect(true, runAsync);
          });
        });
      });
    }
  });
};

export default testModule;
