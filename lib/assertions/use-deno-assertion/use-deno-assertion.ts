/**
 * Asserts using a deno assertion like `assertEquals` or `assertMatch`.
 *
 * @param assert - A deno assertion like `assertEquals`.
 * @param args - The arguments taken by `assert` as an array.
 * @returns A `boolean` that indicates the success or failure of the assertion.
 *   It is `true` when the assertion passes, and false otherwise.
 */
// deno-lint-ignore no-explicit-any
const useDenoAssertion = <DenoAssert extends (...args: Array<any>) => void>(
  assert: DenoAssert,
  args: Parameters<DenoAssert>
) => {
  try {
    assert(...args);
    return true;
  } catch {
    return false;
  }
};

const useDenoAssertionAsync = async <
  // deno-lint-ignore no-explicit-any
  DenoAssert extends (...args: Array<any>) => Promise<void>
>(
  assert: DenoAssert,
  args: Parameters<DenoAssert>
) => {
  try {
    await assert(...args);
    return true;
  } catch {
    return false;
  }
};

export default useDenoAssertion;
export { useDenoAssertion, useDenoAssertionAsync };
