import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toContainString from './to-contain-string.ts';

const testToContainString = () => {
  console.log(format.bold('toContainString') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: `"Test" should contain "T"`,
    getResult: () => {
      expect('Test', toContainString('T'));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `"Test" should not contain "a"`,
    message: `"Test" does not contain "a"`,
    getResult: () => {
      expect('Test', toContainString('a'));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `"Test" should not contain "E"`,
    message: `"Test" does not contain "E"`,
    getResult: () => {
      expect('Test', toContainString('E'));
    }
  });
};

export default testToContainString;
