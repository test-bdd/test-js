import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toBeLessThan from './to-be-less-than.ts';

const testToBeLessThan = () => {
  console.log(format.bold('toBeLessThan') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: '1 should be less than 2',
    getResult: () => {
      expect(1, toBeLessThan(2));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '1 is not less than 0',
    description: '1 should not be less than 0',
    getResult: () => {
      expect(1, toBeLessThan(0));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '1 is not less than 1',
    description: '1 should not be less than 1',
    getResult: () => {
      expect(1, toBeLessThan(1));
    }
  });
};

export default testToBeLessThan;
