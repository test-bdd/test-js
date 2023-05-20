import type { Count, TestHandler } from '../types/test.types.ts';

export const getTotalCount = <Type extends TestHandler>(
  testHandlers: Array<Type>
): Count => {
  return testHandlers.reduce(
    (total, { getCount }) => {
      const { failed } = getCount();
      const passedIncrement = failed ? 0 : 1;
      const failedIncrement = 1 - passedIncrement;

      return {
        passed: total.passed + passedIncrement,
        failed: total.failed + failedIncrement
      };
    },
    { passed: 0, failed: 0 }
  );
};

export const getTestCount = <Handler extends TestHandler>(
  count: Count,
  handlers: Array<Handler>
) => {
  if (!(count.passed || count.failed)) {
    count = getTotalCount(handlers);
  }

  return count;
};
