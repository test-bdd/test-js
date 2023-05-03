import print from './print.ts';
import { TestHandler } from '../types/test.types.ts';
import { passed } from './passed.ts';

export type TestFinisherOptions<Handler, SubHandler> = {
  getCount: TestHandler['getCount'];
  getTime: TestHandler['getTime'];
  subHandlers: Array<SubHandler>;
  message: string;
  prefix: string;
};

const finishTest = <
  Handler extends TestHandler,
  SubHandler extends TestHandler
>(
  options: TestFinisherOptions<Handler, SubHandler>
) => {
  const { getCount, getTime, subHandlers, message, prefix } = options;
  print({
    passed: passed(getCount()),
    message: message,
    count: getCount(),
    time: getTime(),
    prefix
  });

  for (const handler of subHandlers) handler.finish();
};

export default finishTest;
