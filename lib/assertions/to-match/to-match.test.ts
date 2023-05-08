import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
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
    description: `"Test" should match /T/`,
    getResult: () => {
      expect('Test', toMatch(regex));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: `"Test" should match "T"`,
    getResult: () => {
      expect('Test', toMatch('t'));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `"Test" should not match "a"`,
    message: `"Test" does not match "a"`,
    getResult: () => {
      expect('Test', toMatch('a'));
    }
  });
};

export default testToMatch;
