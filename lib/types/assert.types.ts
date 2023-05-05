export type ConfirmResult = {
  passed: boolean;
  message?: string;
};

export type Confirm = (input: unknown) => ConfirmResult;
