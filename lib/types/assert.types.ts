export type AssertResult = {
  passed: boolean;
  message?: string;
};

export type Assert<Input> = (input: Input) => AssertResult;
