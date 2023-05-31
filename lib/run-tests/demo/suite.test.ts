import toBe from '../../assertions/to-be/to-be.ts';
import { mod } from '../../module/module.ts';
import { type ModuleRunner } from '../../module/module.ts';

const isEven = (num: number) => num % 2 === 0;

export const runSuite: ModuleRunner = (describe) => {
  describe('isEven', (it) => {
    it('should return true for multiples of 2', (expect) => {
      expect(isEven(2), toBe(true));
      expect(isEven(100), toBe(true));
    });

    it('should return true for 0', (expect) => {
      expect(isEven(0), toBe(true));
    });
  });
};

export const run = () => {
  mod('Parity', runSuite);
};
