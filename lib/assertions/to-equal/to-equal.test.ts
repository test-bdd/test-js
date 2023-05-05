import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toEqual from './to-equal.ts';

const testToEqual = () => {
  const obj1 = {
    first: 1,
    second: 'Hello'
  };

  const obj2 = {
    first: 1,
    second: 'Hello'
  };

  const bool = true;
  const fun1 = (value: unknown) => value;
  const fun2 = (value: unknown) => value;
  console.log(format.bold('toEqual') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: 'Objects with the same reference should match',
    getResult: () => {
      expect(obj1, toEqual(obj2));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description:
      'Objects with different references but the same structure should match',
    getResult: () => {
      expect(obj1, toEqual({ first: 1, second: 'Hello' }));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: `${JSON.stringify(obj1)} is not equal to {}`,
    description: 'Objects with different structures should not match',
    getResult: () => {
      expect(obj1, toEqual({}));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Booleans with the same value should match',
    getResult: () => {
      expect(bool, toEqual(true));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: 'true is not equal to false',
    description: 'Booleans with different values should not match',
    getResult: () => {
      expect(bool, toEqual(false));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Functions with the same value should match',
    getResult: () => {
      expect(fun1, toEqual(fun2));
    }
  });
};

export default testToEqual;
