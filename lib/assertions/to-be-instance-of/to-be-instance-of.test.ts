import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toBeInstanceOf from './to-be-instance-of.ts';

const testToBeInstanceOf = () => {
  const regex = /1/;
  console.log(format.bold('toBeInstanceOf') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: 'A regex should be an instance of RegExp',
    getResult: () => {
      expect(regex, toBeInstanceOf(RegExp));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: 'A regex should not be an instance of String',
    message: `${toString(regex)} is not an instance of ${toString(String)}`,
    getResult: () => {
      expect(regex, toBeInstanceOf(String));
    }
  });
};

export default testToBeInstanceOf;
