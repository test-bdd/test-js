import type { Count, TestHandler } from '../types/test.types.ts';

export const getTotalCount = <Type extends TestHandler>(
  testHandlers: Array<Type>
): Count => {
  return testHandlers.reduce(
    (total, { getCount }) => {
      return {
        passed: total.passed + getCount().passed,
        failed: total.failed + getCount().failed
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
