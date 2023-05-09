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
