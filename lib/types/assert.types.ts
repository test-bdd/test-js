export type ConfirmResult = {
  passed: boolean;
  message?: string;
};

export type Confirm = (input: unknown) => ConfirmResult;

export type ConfirmAsync = (input: unknown) => Promise<ConfirmResult>;

export type Assert = (...target: Array<unknown>) => Confirm;

export type AssertOptional = (target?: unknown) => Confirm;

export type AssertVoid = () => Confirm;
