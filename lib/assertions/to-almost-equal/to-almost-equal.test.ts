import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import createToAlmostEqual from './to-almost-equal.ts';

const testToAlmostEqual = () => {
  console.log(format.bold('toAlmostEqual') + '\n');
  const toAlmostEqual = createToAlmostEqual();

  testAndPrint({
    expectedToPass: true,
    description: 'Numbers with the same value must be almost equal',
    getResult: () => {
      expect(1, toAlmostEqual(1));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Numbers are close enough must be almost equal',
    getResult: () => {
      expect(0.1 + 0.2, toAlmostEqual(0.3));
    }
  });

  testAndPrint({
    expectedToPass: false,
    description: 'Numbers that are not close enough must not be almost equal',
    message: '1 is not almost equal to 2',
    getResult: () => {
      expect(1, toAlmostEqual(2));
    }
  });

  testAndPrint({
    expectedToPass: true,
    description:
      'Numbers are close enough according to custom tolerance must be almost equal',
    getResult: () => {
      expect(100, createToAlmostEqual(1)(101));
    }
  });
};

export default testToAlmostEqual;
