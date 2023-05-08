import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toThrow from './to-throw.ts';

const testToThrow = () => {
  console.log(format.bold('toThrow') + '\n');
  const errorMessage = 'Unknown error occurred';

  const throwFun = () => {
    throw new Error();
  };

  const throwWithMessage = () => {
    throw new Error(errorMessage);
  };

  const getError = () => new Error(errorMessage);

  const fun = () => {};

  testAndPrint({
    expectedToPass: true,
    description: `${toString(throwFun)} should throw ${Error}`,
    getResult: () => {
      expect(throwFun, toThrow(Error));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: `${toString(throwFun)} should throw ${new Error(
      errorMessage
    )}`,
    getResult: () => {
      expect(throwWithMessage, toThrow(getError));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not throw`,
    message: `${toString(fun)} does not throw`,
    getResult: () => {
      expect(fun, toThrow());
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not throw ${Error}`,
    message: `${toString(fun)} does not throw ${toString(Error)}`,
    getResult: () => {
      expect(fun, toThrow(Error));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not throw ${new Error(errorMessage)}`,
    message: `${toString(fun)} does not throw ${toString(getError)}`,
    getResult: () => {
      expect(fun, toThrow(getError));
    }
  });
};

export default testToThrow;
