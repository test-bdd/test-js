import { format } from '../deps.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { module } from './module.ts';

const testStep = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Module') + '\n');
  const descriptionModule = 'Primitives';
  const descriptionSuite = 'Boolean';
  const descriptionStep = 'should match boolean values';

  testAndPrint({
    description: 'Suite',
    expectedToPass: true,
    message: descriptionModule,
    getResult: () => {
      module(descriptionModule, (describe) => {
        describe(descriptionSuite, (it) => {
          it(descriptionStep, (expect) => {
            expect(true, () => ({ passed: true }));
          });
        });
      });
    }
  });

  testAndPrint({
    description: 'Suite',
    expectedToPass: false,
    message: descriptionModule,
    getResult: () => {
      module(descriptionModule, (describe) => {
        describe(descriptionSuite, (it) => {
          it(descriptionStep, (expect) => {
            expect(true, () => ({ passed: false, message: failMessage }));
          });
        });
      });
    }
  });
};

export default testStep;
