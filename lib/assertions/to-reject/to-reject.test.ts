import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toReject from './to-reject.ts';

const testToReject = async () => {
  console.log(format.bold('toReject') + '\n');
  const reject = () => new Promise((_, reject) => reject(new Error()));
  const fun = () => new Promise((resolve) => resolve(undefined));
  const ErrorWithMessage = () => new Error('An unknown error occurred.');

  await testAndPrint({
    expectedToPass: true,
    description: `${toString(reject)} should reject with ${Error}`,
    getResult: () => {
      return expect(reject, toReject(Error));
    }
  });

  await testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not reject`,
    message: `${toString(fun)} does not reject`,
    getResult: () => {
      return expect(fun, toReject(Error));
    }
  });

  await testAndPrint({
    expectedToPass: false,
    description: `${toString(fun)} should not reject with ${Error}`,
    message: `${toString(fun)} does not reject with ${toString(Error)}`,
    getResult: () => {
      return expect(fun, toReject(Error));
    }
  });

  await testAndPrint({
    expectedToPass: false,
    description: `${toString(reject)} should not reject with ${toString(
      ErrorWithMessage
    )}`,
    message: `${toString(reject)} does not reject with ${toString(
      ErrorWithMessage
    )}`,
    getResult: () => {
      return expect(reject, toReject(Error, 'An error occurred'));
    }
  });
};

export default testToReject;
