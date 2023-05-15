import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toThrow from './to-throw.ts';

const testToThrow = () => {
  console.log(format.bold('toThrow') + '\n');
  const errorMessage = 'Unknown error occurred';

  const throwError = () => {
    throw new Error();
  };

  const throwWithMessage = () => {
    throw new Error(errorMessage);
  };

  const fun = () => {};

  testAndPrint({
    expectedToPass: true,
    description: `${toString(throwError)} should throw ${Error}`,
    getResult: () => {
      expect(throwError, toThrow(Error));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: `${toString(throwError)} should throw ${new Error(
      errorMessage
    )}`,
    getResult: () => {
      expect(throwWithMessage, toThrow(Error, errorMessage));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not throw ${toString(Error)}`,
    message: `${toString(fun)} does not throw ${toString(Error)}`,
    getResult: () => {
      expect(fun, toThrow(Error));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not throw ${toString(Error)}`,
    message: `${toString(fun)} does not throw ${toString(Error)}`,
    getResult: () => {
      expect(fun, toThrow(Error));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `${toString(throwError)} should not throw ${new Error(
      errorMessage
    )}`,
    message: `${toString(throwError)} does not throw ${toString(Error)}`,
    getResult: () => {
      expect(throwError, toThrow(Error, 'An error occurred'));
    }
  });
};

export default testToThrow;
