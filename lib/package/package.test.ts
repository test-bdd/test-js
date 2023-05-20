import { format } from '../deps.ts';
import type { ConfirmAsync } from '../types/assert.types.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { pack } from './package.ts';

const testPackage = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Package') + '\n');
  const descriptionPackage = 'Types';
  const descriptionModule = 'Primitives';
  const descriptionSuite = 'Boolean';
  const descriptionStep = 'should match boolean values';

  const runAsync: ConfirmAsync = () =>
    new Promise((resolve) => resolve({ passed: true }));

  testAndPrint({
    description: 'Package',
    expectedToPass: true,
    message: descriptionPackage,
    getResult: () => {
      pack(descriptionPackage, (mod) => {
        mod(descriptionModule, (describe) => {
          describe(descriptionSuite, (it) => {
            it(descriptionStep, (expect) => {
              expect(true, () => ({ passed: true }));
            });
          });
        });
      });
    }
  });

  testAndPrint({
    description: 'Package',
    expectedToPass: false,
    message: descriptionPackage,
    getResult: () => {
      pack(descriptionPackage, (mod) => {
        mod(descriptionModule, (describe) => {
          describe(descriptionSuite, (it) => {
            it(descriptionStep, (expect) => {
              expect(true, () => ({ passed: false, message: failMessage }));
            });
          });
        });
      });
    }
  });

  testAndPrint({
    description: 'Package Async',
    expectedToPass: true,
    message: descriptionPackage,
    getResult: async () => {
      await pack(descriptionPackage, async (mod) => {
        await mod(descriptionModule, async (describe) => {
          await describe(descriptionSuite, async (it) => {
            await it(descriptionStep, async (expect) => {
              await expect(true, runAsync);
              await expect(true, runAsync);
            });
          });
        });
      });
    }
  });
};

export default testPackage;
