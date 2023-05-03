export type PickRequired<Type, Fields extends keyof Type> = Partial<Type> &
  Pick<Type, Fields>;
