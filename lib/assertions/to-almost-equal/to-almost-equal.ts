import { assertAlmostEquals } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

// * This is the default tolerance for assertAlmostEquals
const DEFAULT_TOLERANCE = 1e-7;

export type ToAlmostEqual = (tolerance?: number) => Assert;

const toAlmostEqual: ToAlmostEqual =
  (tolerance = DEFAULT_TOLERANCE) =>
  (result) =>
  (expectation) => {
    const areAlmostEqual = useDenoAssertion(assertAlmostEquals, [
      result as number,
      expectation as number,
      tolerance
    ]);

    if (areAlmostEqual) {
      return {
        passed: true
      };
    } else {
      return {
        passed: false,
        message: `${toString(expectation)} is not almost equal to ${toString(
          result
        )}`
      };
    }
  };

export default toAlmostEqual;
