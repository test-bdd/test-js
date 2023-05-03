export type Count = {
  passed: number;
  failed: number;
};

export type Test = {
  passed: boolean;
  message: string;
  count: Count;
  time: number;
};

export type TestHandler = {
  finish: () => void;
  getCount: () => Count;
  getTime: () => number;
};

export type TestHandlerCreator<Data, Handler> = (
  data: Data,
  prefix?: string
) => Handler;
