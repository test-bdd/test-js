import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toBeGreaterThan from './to-be-greater-than.ts';

const testToBeGreaterThan = () => {
  console.log(format.bold('toBeGreaterThan') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: '2 should be greater than 1',
    getResult: () => {
      expect(2, toBeGreaterThan(1));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '0 is not greater than 1',
    description: '0 should not be greater than 1',
    getResult: () => {
      expect(0, toBeGreaterThan(1));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '1 is not greater than 1',
    description: '1 should not be greater than 1',
    getResult: () => {
      expect(1, toBeGreaterThan(1));
    }
  });
};

export default testToBeGreaterThan;
