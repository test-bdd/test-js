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

export default useDenoAssertion;