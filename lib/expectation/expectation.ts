import type {
  TestHandlerCreator,
  Test,
  TestHandler
} from '../types/test.types.ts';
import type { Assert, AssertResult } from '../types/assert.types.ts';
import print from '../utils/print.ts';
import { PickRequired } from '../types/utils.types.ts';

export type Expectation = Test;
export type ExpectationHandler = TestHandler;
export type Expect<Input> = (input: Input, assert: Assert<Input>) => void;
export type ExpectationHandlerCreator = TestHandlerCreator<
  AssertResult,
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

export const handleExpectation = <Input>(
  expectation: Input,
  assert: Assert<Input>,
  createExpectationHandler: (
    data: AssertResult,
    prefix?: string
  ) => PickRequired<ExpectationHandler, 'finish'>
) => {
  const handler = createExpectationHandler(assert(expectation));
  handler.finish();
};

export const expect = <Input>(expectation: Input, assert: Assert<Input>) => {
  handleExpectation(expectation, assert, createExpectationHandler);
};
