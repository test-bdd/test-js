import { format } from '../../deps.ts';
import { expect } from '../../expectation/expectation.ts';
import testAndPrint from '../../utils/test-and-print.ts';
import toExist from './to-exist.ts';

const testToExist = () => {
  console.log(format.bold('toExist') + '\n');

  testAndPrint({
    expectedToPass: true,
    description: 'Boolean should exist',
    getResult: () => {
      expect(false, toExist());
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Number should exist',
    getResult: () => {
      expect(0, toExist());
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'String should exist',
    getResult: () => {
      expect('', toExist());
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Object should exist',
    getResult: () => {
      expect({}, toExist());
    }
  });

  testAndPrint({
    expectedToPass: true,
    description: 'Array should exist',
    getResult: () => {
      expect([], toExist());
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: 'undefined does not exist',
    description: 'undefined should not exist',
    getResult: () => {
      expect(undefined, toExist());
    }
  });

  testAndPrint({
    expectedToPass: false,
    message: 'null does not exist',
    description: 'null should not exist',
    getResult: () => {
      expect(null, toExist());
    }
  });
};

export default testToExist;
