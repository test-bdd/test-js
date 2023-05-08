import type { Confirm } from '../../types/assert.types.ts';
import { assertEquals, format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import useDenoAssertion from './use-deno-assertion.ts';

const testUseDenoAssertion = () => {
  console.log(format.bold('useDenoAssertion') + '\n');

  const confirm =
    (passed: boolean): Confirm =>
    () => ({
      passed,
      message: passed ? undefined : 'Test failed'
    });

  testAndPrint({
    expectedToPass: true,
    description: 'assertEquals should pass',
    getResult: () => {
      expect(true, confirm(useDenoAssertion(assertEquals, [1, 1])));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: 'assertEquals should not pass',
    message: 'Test failed',
    getResult: () => {
      expect(true, confirm(useDenoAssertion(assertEquals, [1, 2])));
    }
  });
};

export default testUseDenoAssertion;
