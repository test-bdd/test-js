import { TestHandler } from '../types/test.types.ts';

export const getTestTime = <Handler extends TestHandler>(
  time: number,
  handlers: Array<Handler>
): number => {
  if (time) return time;
  return handlers.reduce((time, { getTime }) => time + getTime(), 0);
};
