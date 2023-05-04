import { format } from '../deps.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { pack } from './package.ts';

const testStep = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Package') + '\n');
  const descriptionPackage = 'Types';
  const descriptionModule = 'Primitives';
  const descriptionSuite = 'Boolean';
  const descriptionStep = 'should match boolean values';

  testAndPrint({
    description: 'Suite',
    expectedToPass: true,
    message: descriptionPackage,
    getResult: () => {
      pack(descriptionPackage, (module) => {
        module(descriptionModule, (describe) => {
          describe(descriptionSuite, (it) => {
            it(descriptionStep, (expect) => {
              expect(true, () => ({ passed: true }));
            });
          });
        });
      });
    }
  });

  testAndPrint({
    description: 'Suite',
    expectedToPass: false,
    message: descriptionPackage,
    getResult: () => {
      pack(descriptionPackage, (module) => {
        module(descriptionModule, (describe) => {
          describe(descriptionSuite, (it) => {
            it(descriptionStep, (expect) => {
              expect(true, () => ({ passed: false, message: failMessage }));
            });
          });
        });
      });
    }
  });
};

export default testStep;