export type Test = {
  passed: boolean;
  message: string;
  count: {
    passed: number;
    failed: number;
  };
  time: number;
};

export type TestHandler = {
  finish: () => void;
  getCount: () => Test['count'];
  getTime: () => number;
};

export type TestHandlerCreator<Data, Handler> = (
  data: Data,
  prefix?: string
) => Handler;
