import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toBe from './to-be.ts';

const testToBe = () => {
  const obj1 = {};
  const obj2 = obj1;
  const bool = true;
  console.log(format.bold('toBe') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: 'Objects should match',
    getResult: () => {
      expect(obj1, toBe(obj2));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: '{} is not {}',
    description: 'Objects should not match',
    getResult: () => {
      expect(obj1, toBe({}));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Boolean values should match',
    getResult: () => {
      expect(bool, toBe(true));
    }
  });
};

export default testToBe;
