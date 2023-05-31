import toBe from '../../assertions/to-be/to-be.ts';
import { it } from '../../step/step.ts';

const fun = <Input>(input: Input) => input;

export const run = () => {
  it('should return input', (expect) => {
    expect(fun(true), toBe(true));
  });
};
