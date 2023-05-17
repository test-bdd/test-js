import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toBeGreaterThanOrEqual from './to-be-greater-than-or-equal.ts';

const testToBeGreaterThanOrEqual = () => {
  console.log(format.bold('toBeGreaterThanOrEqual') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: '2 should be greater than or equal to 1',
    getResult: () => {
      expect(2, toBeGreaterThanOrEqual(1));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: '1 should be greater than or equal to 1',
    getResult: () => {
      expect(1, toBeGreaterThanOrEqual(1));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '0 is not greater than or equal to 1',
    description: '0 should not be greater than or equal to 1',
    getResult: () => {
      expect(0, toBeGreaterThanOrEqual(1));
    }
  });
};

export default testToBeGreaterThanOrEqual;
