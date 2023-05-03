import { format } from '../deps.ts';

export type ResultGetter = () => void;

export type TestAndPrintOptions = {
  description: string;
  expectedToPass: boolean;
  message?: string;
  getResult: ResultGetter;
};

const testAndPrint = (options: TestAndPrintOptions) => {
  const { description, expectedToPass, message, getResult } = options;
  const passString = expectedToPass
    ? format.green('PASSED')
    : format.red('FAILED');

  const expectation = message ? `${passString}: ${message}` : passString;

  console.log(description);
  console.log('Expectation:');
  console.log(expectation + '\n');
  console.log('Result:');
  getResult();
  console.log('\n');
};

export default testAndPrint;
