import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toMatchObject from './to-match-object.ts';

const testToMatchObject = () => {
  console.log(format.bold('toMatchObject') + '\n');
  const object = { num: 1, str: 's' };

  testAndPrint({
    expectedToPass: true,
    description: `${toString(object)} should match { num: 1 }`,
    getResult: () => {
      expect(object, toMatchObject({ num: 1 }));
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: `${toString(object)} does not match ${toString({ num: 2 })}`,
    description: `${toString(object)} should not match { num: 2 }`,
    getResult: () => {
      expect(object, toMatchObject({ num: 2 }));
    }
  });
};

export default testToMatchObject;
