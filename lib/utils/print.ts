import { format } from '../deps.ts';
import { Test } from '../types/test.types.ts';

export type Options = Test & {
  prefix: string;
};

const print = (options: Options) => {
  const { prefix, passed, time, count, message } = options;
  const coloredResult = passed ? format.green('PASSED') : format.red('FAILED');
  let output = prefix + coloredResult;
  if (message) output += ': ' + message;
  console.log(output);
};

export default print;
