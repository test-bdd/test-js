import { format } from '../deps.ts';
import testAndPrint from '../utils/test-and-print.ts';
import { it } from './step.ts';

const testStep = () => {
  const failMessage = "Boolean values didn't match";
  console.log(format.bold('Step') + '\n');

  testAndPrint({
    description: 'boolean values should match',
    expectedToPass: true,
    message: 'returns true when boolean values match',
    getResult: () => {
      it('returns true when boolean values match', (expect) => {
        expect(true, () => ({ passed: true }));
      });
    }
  });

  testAndPrint({
    description: 'boolean values should not match',
    expectedToPass: false,
    message: "returns false when boolean values don't match",
    getResult: () => {
      it("returns false when boolean values don't match", (expect) => {
        expect(true, () => ({ passed: false, message: failMessage }));
      });
    }
  });
};

export default testStep;
