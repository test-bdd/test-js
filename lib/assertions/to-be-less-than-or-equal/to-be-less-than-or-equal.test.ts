import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toBeLessThanOrEqual from './to-be-less-than-or-equal.ts';

const testToBeLessThanOrEqual = () => {
  console.log(format.bold('toBeLessThanOrEqual') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: '1 should be less than or equal 2',
    getResult: () => {
      expect(1, toBeLessThanOrEqual(2));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: '1 should be less than or equal 1',
    getResult: () => {
      expect(1, toBeLessThanOrEqual(1));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '1 is not less than or equal to 0',
    description: '1 should not be less than or equal to 0',
    getResult: () => {
      expect(1, toBeLessThanOrEqual(0));
    }
  });
};

export default testToBeLessThanOrEqual;
