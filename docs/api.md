# API



## Table of Contents
- [API](#api)
  - [`describe`](#describe)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 1](#examples-1)
      - [Example 1-1](#example-1-1)
      - [Example 1-2](#example-1-2)
  - [`expect`](#expect)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 2](#examples-2)
      - [Example 2-1](#example-2-1)
      - [Example 2-2](#example-2-2)
  - [`it`](#it)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 3](#examples-3)
      - [Example 3-1](#example-3-1)
      - [Example 3-2](#example-3-2)
  - [`mod`](#mod)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 4](#examples-4)
      - [Example 4-1](#example-4-1)
      - [Example 4-2](#example-4-2)
  - [`not`](#not)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 5](#examples-5)
      - [Example 5-1](#example-5-1)
  - [`pack`](#pack)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 6](#examples-6)
      - [Example 6-1](#example-6-1)
      - [Example 6-2](#example-6-2)
  - [`toAlmostEqual`](#toalmostequal)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 7](#examples-7)
      - [Example 7-1](#example-7-1)
  - [`toBe`](#tobe)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 8](#examples-8)
      - [Example 8-1](#example-8-1)
  - [`toBeGreaterThan`](#tobegreaterthan)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 9](#examples-9)
      - [Example 9-1](#example-9-1)
  - [`toBeGreaterThanOrEqual`](#tobegreaterthanorequal)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 10](#examples-10)
      - [Example 10-1](#example-10-1)
  - [`toBeInstanceOf`](#tobeinstanceof)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 11](#examples-11)
      - [Example 11-1](#example-11-1)
  - [`toBeLessThan`](#tobelessthan)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 12](#examples-12)
      - [Example 12-1](#example-12-1)
  - [`toBeLessThanOrEqual`](#tobelessthanorequal)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 13](#examples-13)
      - [Example 13-1](#example-13-1)
  - [`toContainElement`](#tocontainelement)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 14](#examples-14)
      - [Example 14-1](#example-14-1)
      - [Example 14-2](#example-14-2)
  - [`toContainString`](#tocontainstring)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 15](#examples-15)
      - [Example 15-1](#example-15-1)
  - [`toEqual`](#toequal)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 16](#examples-16)
      - [Example 16-1](#example-16-1)
      - [Example 16-2](#example-16-2)
  - [`toExist`](#toexist)
    - [Return Value](#return-value)
    - [Examples 17](#examples-17)
      - [Example 17-1](#example-17-1)
  - [`toMatch`](#tomatch)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 18](#examples-18)
      - [Example 18-1](#example-18-1)
  - [`toMatchObject`](#tomatchobject)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 19](#examples-19)
      - [Example 19-1](#example-19-1)
  - [`toReject`](#toreject)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 20](#examples-20)
      - [Example 20-1](#example-20-1)
  - [`toThrow`](#tothrow)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Examples 21](#examples-21)
      - [Example 21-1](#example-21-1)


## `describe`

Runs a test suite; a collection of steps.

### Parameters

- `description`: A description of the test suite.
- `runSuite`: A callback that runs steps.

### Return Value

A promise if `runSuite` is asynchronous, `void` otherwise.

### Examples 1

#### Example 1-1

```ts
// Synchronous
const isEven = (num: number) => num % 2 === 0;
describe("isEven", it => {
  it("should return true for multiples of 2", expect => {
    expect(isEven(2), toEqual(true));
    expect(isEven(100), toEqual(true));
  });
  it("should return true for 0", expect => {
    expect(isEven(0), toEqual(true));
  });
  // More it
});
```

#### Example 1-2

```ts
// Asynchronous
// Remember to wrap this in an async function if you are using an environment
// that does not support top level await.
const delay = timeMilliseconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeMilliseconds);
  });
};
await describe("delay", async it => {
  await it("should delay by 1s", async expect => {
    const time = performance.now();
    await delay(1000);
    expect(performance.now() - time, toBeGreaterThanOrEqual(1000));
  });
  // More it
});
```

## `expect`

Runs an assertion.


### Parameters

- `expectation`: The known value to assert.
- `assert`: The function used for assertion.

### Return Value

A promise if `assert` is asynchronous, `void` otherwise.

### Examples 2

#### Example 2-1

```ts
// Synchronous
expect(true, toEqual(true)); // PASSED
```

#### Example 2-2

```ts
// Asynchronous
// Remember to wrap this in an async function if you are using an environment
// that does not support top level await.
const reject = () => {
  return new Promise((_, reject) => reject(new Error()));
};
await expect(reject, toReject(Error)); // PASSED
```

## `it`

Runs a step; a collection of assertions.


### Parameters

- `description`: Description of the step.
- `test`: The callback that runs assertions.

### Return Value

A promise if `test` is asynchronous, `void` otherwise.

### Examples 3

#### Example 3-1

```ts
// Synchronous
const isEven = (num: number) => num % 2 === 0;
it("returns true if number is even", expect => {
  expect(isEven(2), toEqual(true)); // PASSED
  // More expect
});
```

#### Example 3-2

```ts
// Asynchronous
// Remember to wrap this in an async function if you are using an environment
// that does not support top level await.
const delay = timeMilliseconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeMilliseconds);
  });
};
await it("should delay by 1000ms", async expect => {
  const time = performance.now();
  await delay(1000);
  expect(performance.now() - time, toBeGreaterThanOrEqual(1000));
});
```

## `mod`

Runs a module; a collection of test suites.

### Parameters

- `description`: A description of the module.
- `runModule`: A callback that runs suites.

### Return Value

A promise if `runModule` is asynchronous, `void` otherwise.

### Examples 4

#### Example 4-1

```ts
// Synchronous
mod("Math", describe => {
  describe("isEven", it => {
    it("should return true for multiples of 2", expect => {
      expect(isEven(2), toEqual(true));
      expect(isEven(1000), toEqual(true));
    });
    it("should return true for 0", expect => {
      expect(isEven(0), toEqual(true));
    });
  });
});
```

#### Example 4-2

```ts
// Asynchronous
// Remember to wrap this in an async function if you are using an environment
// that does not support top level await.
await mod("Time", async describe => {
  // Asynchronous code
});
```

## `not`

Inverts the actual of an assertion.


### Parameters

- `confirm`: A callback for assertion.The callback can be returned by other assertion functions like `toEqual`.

### Return Value

`void`

### Examples 5

#### Example 5-1

```ts
expect(true, not(toEqual(false))); // PASSED
```

## `pack`

Runs a package; a collection of mods.

### Parameters

- `description`: A description of the package.
- `runPackage`: A callback that runs mods.

### Return Value

A promise if `runPackage` is asynchronous, `void` otherwise.

### Examples 6

#### Example 6-1

```ts
// Synchronous
pack("Utils", mod => {
  // mod code
});
```

#### Example 6-2

```ts
// Asynchronous
// Remember to wrap this in an async function if you are using an environment
// that does not support top level await.
await pack("Utils", async mod => {
  // mod code
});
```

## `toAlmostEqual`

Asserts if the given numbers are almost equal.
Numbers are considered to be almost equal if the difference between them
is withing a particular tolerance.


### Parameters

- `tolerance`:The tolerance within which the difference between values must be
to be considered almost equal. The default tolerance is 1e-7.

### Return Value

A function for asserting.

### Examples 7

#### Example 7-1

```ts
expect(0.1 + 0.3, toAlmostEqual(0.3)); // PASSED
```

## `toBe`

Asserts the referential equality of two values.
For primitive values, it has the same functionality as `toEqual`.


### Parameters

- `actual`: The value to be compared to.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and compares it to `actual`.

### Examples 8

#### Example 8-1

```ts
const array1 = [1];
const array2 = array1;
const array3 = [1];
const bool = true;
expect(array2, toBe(array1)); // PASSED
expect(array2, toBe(array3)); // FAILED
expect(array2, toBe([1])); // FAILED
expect(bool, toBe(true)); // PASSED
```

## `toBeGreaterThan`

Asserts if one number is greater than another.


### Parameters

- `actual`: The value to be compared to.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and checks if it is greater than `actual`.

### Examples 9

#### Example 9-1

```ts
expect(2, toBeGreaterThan(1)); // PASSED
```

## `toBeGreaterThanOrEqual`

Asserts if one number is greater than or equal to another.


### Parameters

- `actual`: The value to be compared to.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and checks if it is greater than or equal to `actual`.

### Examples 10

#### Example 10-1

```ts
expect(2, toBeGreaterThanOrEqual(1)); // PASSED
expect(1, toBeGreaterThanOrEqual(1)); // PASSED
```

## `toBeInstanceOf`

Asserts if a given value is an instance of another value.


### Parameters

- `actual`: A class or constructor.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and checks if it is an instance of `actual`.

### Examples 11

#### Example 11-1

```ts
expect(new Date(), toBeInstanceOf(Date)); // PASSED
expect(1000, toBeInstanceOf(Date)); // FAILED
```

## `toBeLessThan`

Asserts if one number is less than another.


### Parameters

- `actual`: The value to be compared to.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and checks if it is less than `actual`.

### Examples 12

#### Example 12-1

```ts
expect(1, toBeLessThan(2)); // PASSED
```

## `toBeLessThanOrEqual`

Asserts if one number is less than or equal another.


### Parameters

- `actual`: The value to be compared to.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and checks if it is less than or equal `actual`.

### Examples 13

#### Example 13-1

```ts
expect(1, toBeLessThanOrEqual(2)); // PASSED
expect(1, toBeLessThanOrEqual(1)); // PASSED
```

## `toContainElement`

Asserts if a given value is an element of an array.


### Parameters

- `actual`: A value that maybe an element of an array.

### Return Value

`Confirm`; a function that takes the array passed to `expect`
and checks if it contains `actual`.

### Examples 14

#### Example 14-1

```ts
// With a primitive
expect([1], toContainElement(1)); // PASSED
```

#### Example 14-2

```ts
// With an object
const obj = { name: "Test" };
expect([obj], toContainElement(obj)); // PASSED
```

## `toContainString`

Asserts if a given string contains a given substring.


### Parameters

- `actual`: A substring that may be contained in another string.

### Return Value

`Confirm`; a function that takes the string passed to `expect`
and checks if it contains `actual`.

### Examples 15

#### Example 15-1

```ts
expect("Test", toContainString("T")); // PASSED
expect("Test", toContainString("E")); // FAILED
```

## `toEqual`

Asserts if two values are structurally equal.


### Parameters

- `actual`: The value to be compared to.

### Return Value

`Confirm`; a function that takes the value passed to `expect`
and compares it to `actual`.

### Examples 16

#### Example 16-1

```ts
// With a primitive
expect(true, toEqual(true)); // PASSED
```

#### Example 16-2

```ts
// With an object
const obj = { name: "Test" };
expect(obj, toEqual({ name: "Test" })); // PASSED
```

## `toExist`

Asserts if a given value is `null` or `undefined`.


### Return Value

`Confirm`; a function that takes the value passed to `expect`
and checks if it is `null` or `undefined`.

### Examples 17

#### Example 17-1

```ts
expect(false, toExist()); // PASSED
expect(null, toExist()); // FAILED
```

## `toMatch`

Asserts if a `string` matches a `RegExp` or another `string`.


### Parameters

- `actual`: A `RegExp` or `string`.If `actual` is a `string`, it is converted to a `RegExp`.

### Return Value

`Confirm`; a function that takes the `string` passed to `expect`
and checks if it matches `actual`.

### Examples 18

#### Example 18-1

```ts
expect("Test", toMatch("T")); // PASSED
expect("Test", toMatch("E")); // PASSED
```

## `toMatchObject`

Asserts if an object matches a subset of the properties of another object.


### Parameters

- `actual`: The object to be matched against.

### Return Value

`Confirm`; a function that takes the object passed to `expect`
and checks if it matches `actual`.

### Examples 19

#### Example 19-1

```ts
const user = { username: "johndoe", age: 19 };
expect(user, toMatchObject({ username: "johndoe" })); // PASSED
```

## `toReject`

Asserts if a given function rejects.


### Parameters

- `Err`: An constructor that returns an errora given function is expected to reject with.
- `message`: A message the error thrown is expected to have.

### Return Value

`Confirm`; a function that takes the function passed to `expect`
and checks if it rejects. If `Err` is given, it also checks if the function rejects
with the error returned by `Err`.

### Examples 20

#### Example 20-1

```ts
const reject = () => {
  return new Promise((_, reject) => reject(new Error("Error occurred")));
};
expect(reject, toReject()); // PASSED
expect(reject, toReject(Error, "TypeError occurred")); // FAILED
```

## `toThrow`

Asserts if a given function throws.


### Parameters

- `Err`: A constructor of an error a given function is expected to throw.
- `message`: The message the error thrown is expected to have.

### Return Value

`Confirm`; a function that takes the function passed to `expect`
and checks if it throws.
If `Err` is provided, it also checks if the error thrown matches `Err`.

### Examples 21

#### Example 21-1

```ts
const throwError = () => {
  throw new Error();
};
expect(throwError, toThrow(Error)); // PASSED
expect(throwError, toThrow(Error, "An unknown error occurred")); // FAILED
```