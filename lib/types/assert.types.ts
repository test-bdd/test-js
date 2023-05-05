export type AssertResult = {
  passed: boolean;
  message?: string;
};

export type Assert = (input: unknown) => AssertResult;
