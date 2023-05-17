import { format } from '../deps.ts';
import { Test } from '../types/test.types.ts';

export type Options = Test & {
  prefix: string;
};

const print = (options: Options) => {
  const { prefix, passed, time, count, message } = options;
  const coloredResult = passed ? format.green('PASSED') : format.red('FAILED');
  const stats = ` (${count.passed}/${count.passed + count.failed}) ${time}ms`;
  let output = prefix + coloredResult + stats;
  if (message) output += ': ' + message;
  console.log(output);
};

export default print;
