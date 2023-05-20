import type { ConfirmAsync } from '../../mod.ts';
import { format } from '../deps.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { it } from './step.ts';

const testStep = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Step') + '\n');

  const runAsync: ConfirmAsync = () =>
    new Promise((resolve) => resolve({ passed: true }));

  testAndPrint({
    description: 'boolean values should match',
    expectedToPass: true,
    message: 'returns true when boolean values match',
    getResult: () => {
      it('returns true when boolean values match', (expect) => {
        expect(true, () => ({ passed: true }));
      });
    }
  });

  testAndPrint({
    description: 'boolean values should not match',
    expectedToPass: false,
    message: "returns false when boolean values don't match",
    getResult: () => {
      it("returns false when boolean values don't match", (expect) => {
        expect(true, () => ({ passed: false, message: failMessage }));
      });
    }
  });

  testAndPrint({
    description: 'should run asynchronously properly',
    expectedToPass: true,
    getResult: async () => {
      await it('returns true when boolean values match', async (expect) => {
        await expect(true, runAsync);
        await expect(true, runAsync);
      });
    }
  });
};

export default testStep;
