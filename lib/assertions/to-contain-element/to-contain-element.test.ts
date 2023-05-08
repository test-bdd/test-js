import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toString from '../../utils/to-string.ts';
import toContainElement from './to-contain-element.ts';

const testToContainElement = () => {
  console.log(format.bold('toContainElement') + '\n');
  const array = [1, 2, 3];

  testAndPrint({
    expectedToPass: true,
    description: `[1, 2, 3] should contain 2`,
    getResult: () => {
      expect(array, toContainElement(2));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: `[1, 2, 3] should not contain 4`,
    message: `${toString(array)} does not contain 4`,
    getResult: () => {
      expect(array, toContainElement(4));
    }
  });
};

export default testToContainElement;
