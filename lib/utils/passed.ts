import type { Count } from '../types/test.types.ts';

export const passed = ({ failed }: Count) => failed === 0;
