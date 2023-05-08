export type ConfirmResult = {
  passed: boolean;
  message?: string;
};

export type Confirm = (input: unknown) => ConfirmResult;

export type Assert = (...target: Array<unknown>) => Confirm;

export type AssertVoid = () => Confirm;
