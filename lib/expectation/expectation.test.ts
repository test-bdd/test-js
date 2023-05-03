import { format } from '../deps.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { expect } from './expectation.ts';

const testExpectation = () => {
  const failMessage = "Boolean values didn't match.";
  console.log(format.bold('Expect') + '\n');

  testAndPrint({
    description: 'Boolean values should match',
    expectedToPass: true,
    getResult: () => {
      expect(true, () => ({ passed: true }));
    }
  });

  testAndPrint({
    description: "Boolean values shouldn't match",
    expectedToPass: false,
    message: failMessage,
    getResult: () => {
      expect(true, () => ({ passed: false, message: failMessage }));
    }
  });
};

export default testExpectation;
