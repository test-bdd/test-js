import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toMatch from './to-match.ts';

const testToMatch = () => {
  console.log(format.bold('toMatch') + '\n');
  const regex = /T/;

  testAndPrint({
    expectedToPass: true,
    description: `"Test" should match "Test"`,
    getResult: () => {
      expect('Test', toMatch('Test'));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: `"Test" should match ${toString(regex)}`,
    getResult: () => {
      expect('Test', toMatch(regex));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `"Test" should not match "T"`,
    message: `"Test" does not match "T"`,
    getResult: () => {
      expect('Test', toMatch('T'));
    }
  });
};

export default testToMatch;
