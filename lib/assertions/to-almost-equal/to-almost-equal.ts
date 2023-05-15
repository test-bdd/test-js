import { assertAlmostEquals } from '../../deps.ts';
import type { Assert } from '../../types/assert.types.ts';
import toString from '../../utils/to-string.ts';
import useDenoAssertion from '../use-deno-assertion/use-deno-assertion.ts';

// * This is the default tolerance for assertAlmostEquals
const DEFAULT_TOLERANCE = 1e-7;

export type ToAlmostEqual = (tolerance?: number) => Assert;

/**
 * Asserts if the given numbers are almost equal.
 * Numbers are considered to be almost equal if the difference between them
 * is withing a particular tolerance.
 *
 * @param tolerance -
 *    The tolerance within which the difference between values must be
 *    to be considered almost equal. The default tolerance is 1e-7.
 * @returns A function for asserting.
 */
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
