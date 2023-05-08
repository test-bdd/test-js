import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import type { Confirm } from '../../types/assert.types.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import not from './not.ts';

const testNot = () => {
  console.log(format.bold('not') + '\n');
  const pass: Confirm = () => ({ passed: true });

  const fail: Confirm = () => ({ passed: false, message: 'Test failed' });

  testAndPrint({
    expectedToPass: false,
    description: 'Passing test should fail',
    message: 'Test failed',
    getResult: () => {
      expect(true, not(pass));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Failing test should pass',
    getResult: () => {
      expect(true, not(fail));
    }
  });
};

export default testNot;
