import { format } from '../deps.ts';
import type { ConfirmAsync } from '../types/assert.types.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { describe } from './suite.ts';

const testSuite = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Suite') + '\n');
  const descriptionSuite = 'Boolean';
  const descriptionStep = 'should match boolean values';

  const runAsync: ConfirmAsync = () =>
    new Promise((resolve) => resolve({ passed: true }));

  testAndPrint({
    description: 'Suite',
    expectedToPass: true,
    message: descriptionSuite,
    getResult: () => {
      describe(descriptionSuite, (it) => {
        it(descriptionStep, (expect) => {
          expect(true, () => ({ passed: true }));
        });
      });
    }
  });

  testAndPrint({
    description: 'Suite',
    expectedToPass: false,
    message: descriptionSuite,
    getResult: () => {
      describe(descriptionSuite, (it) => {
        it(descriptionStep, (expect) => {
          expect(true, () => ({ passed: false, message: failMessage }));
        });
      });
    }
  });

  testAndPrint({
    description: 'Suite Async',
    expectedToPass: true,
    message: descriptionSuite,
    getResult: async () => {
      await describe(descriptionSuite, async (it) => {
        await it(descriptionStep, async (expect) => {
          await expect(true, runAsync);
          await expect(true, runAsync);
        });
      });
    }
  });
};

export default testSuite;
