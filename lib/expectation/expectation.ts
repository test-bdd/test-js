import type {
  TestHandlerCreator,
  Test,
  TestHandler
} from '../types/test.types.ts';
import type { Confirm, ConfirmResult } from '../types/assert.types.ts';
import print from '../utils/print.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Expectation = Test;
export type ExpectationHandler = TestHandler;
export type Expect = (input: unknown, assert: Confirm) => void;
export type ExpectationHandlerCreator = TestHandlerCreator<
  ConfirmResult,
  ExpectationHandler
>;

export const createExpectationHandler: ExpectationHandlerCreator = (
  { passed, message = '' },
  prefix = ''
) => {
  const expectation: Expectation = {
    passed,
    message,
    count: {
      passed: passed ? 1 : 0,
      failed: passed ? 0 : 1
    },
    time: 0
  };

  const finish = () => {
    print({ ...expectation, prefix });
  };

  const getCount = () => expectation.count;
  const getTime = () => expectation.time;

  return { finish, getCount, getTime };
};

export const handleExpectation = (
  expectation: unknown,
  assert: Confirm,
  createExpectationHandler: (
    data: ConfirmResult,
    prefix?: string
  ) => PickRequired<ExpectationHandler, 'finish'>
) => {
  const handler = createExpectationHandler(assert(expectation));
  handler.finish();
};

export const expect = (expectation: unknown, assert: Confirm) => {
  handleExpectation(expectation, assert, createExpectationHandler);
};
