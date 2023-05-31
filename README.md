# testjs

A testing library for JavaScript that uses functional programming. The library works in Deno, Node and the browser.

## Features

- **Functional**: It uses functional programming. So, there are no hidden control flows. The tests run in the order you specify, and nothing apart from what you specify is run. This makes your test easier to reason about.
- **Behavior-driven Development (BDD)**: It uses behavior-driven development. This means that you test your code according to features or behavior and not implementation. This makes tests easier to write and testing code easier to maintain because even if the implementation changes, your tests don't have to change.
- **TypeScript**: It supports TypeScript out of the box.
- **Multiple JavaScript Environment**: It works in Deno, Node and in the browser.

## Comparison with Similar Tools

This library shares some similarities with [Jest](https://jestjs.io) and [Vitest](https://vitest.dev). Let us take a look at how similar and different this library is from the aforementioned tools.

### Similarities

This library uses behavior-driven development similar to the one used in Jest and Vitest. It uses the same terminology, such as `expect`, `it`, and `describe`. It also uses patterns and test organization strategies similar to the other tools.

### Differences

This library uses functional programming while Jest and Vitest use object-oriented programming. This library uses scripts written by the user to run the tests, while the other tools use CLI tools. The other libraries stop at the [suite](#suite) level when it comes to organizing tests. This library on the other hand adds two more levels - [module](#module) and [package](#package).

## Architecture

The testing library is organized into five levels giving you an easy way to organize your tests.

```
|-- Package
|   |-- Module
|   |   |-- Suite
|   |   |   |-- Step
|   |   |   |   |-- Expectation
```

### Expectation

This the building block of all tests. It tests if a test meets a particular expectation. For example, if you are testing a function, you can test if the function returns a correct value for a specific input. This level is handled by [`expect`](./docs/api.md#expect).

### Step

A group of related `Expectation`s. It tests if the test subject meets the requirements for a group of expectations. For example, if you are testing a function, you can test if the function returns the correct value for a group of inputs that are related. This level is handled by [`it`](./docs/api.md#it).

### Suite

A group of related `Step`s. It tests if a particular feature is provided correctly by the test subject. For example, it can be used to test whether or not a function works correctly for its use case. This level is handled by [`describe`](./docs/api.md#describe).

### Module

A group of related `Suite`s. It tests if a group of related features are provided correctly by the test subject. For example, you can use it to test if a group of related functions provide the expected features. This level is handled by [`mod`](./docs/api.md#mod).

### Package

This is the top-most test. It is a group of `Module`s. This level is handled by [`pack`](./docs/api.md#pack).

## Usage

### Synchronous

```ts
// Deno
import { describe, toEqual } from 'https://deno.land/x/testjs/mod.ts';

// Node ESM
// import { describe, toEqual } from '@test-bdd/testjs';

// Node CommonJS
// const { describe, toEqual } = require('@test-bdd/testjs');

// Test subject
const isEven = (num: number) => num % 2 === 0;

describe('isEven', (it) => {
  it('should return true for multiples of 2', (expect) => {
    expect(isEven(2), toEqual(true)); // PASSED
    expect(isEven(100), toEqual(true)); // PASSED
  });

  it('should return true for 0', (expect) => {
    expect(isEven(0), toEqual(true)); // PASSED
  });
});
```

### Asynchronous

```ts
// Deno
import {
  describe,
  toBeGreaterThanOrEqual,
  toBeLessThan
} from 'https://deno.land/x/testjs/mod.ts';

// Node ESM
// import {
//   describe,
//   toBeGreaterThanOrEqual,
//   toBeLessThan
// } from '@test-bdd/testjs';

// Node CommonJS
// const {
//   describe,
//   toBeGreaterThanOrEqual,
//   toBeLessThan
// } = require('@test-bdd/testjs');

// Test subject
const delay = (timeMilliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeMilliseconds);
  });
};

describe('delay', async (it) => {
  await it('should delay by 1s', async (expect) => {
    const timeMilliseconds = 1000;
    const time = performance.now();
    await delay(timeMilliseconds);
    const finalTime = performance.now() - time;
    expect(finalTime, toBeGreaterThanOrEqual(timeMilliseconds));
    expect(finalTime, toBeLessThan(timeMilliseconds * 2));
  });
});
```

## Running Tests

You can run tests by simply running the scripts containing the tests. However, the library comes with a test runner that provides a flexible way of running tests.

### Running Scripts

#### Deno

In deno, you can run a script using `deno run main.test.ts` where `main.test.ts` is the name of the test script. You can also create a task in `deno.jsonc` file to avoid repeated typing of long text. A task for running tests may look like the following:

```json
{
  "tasks": {
    "test": "deno run main.test.ts"
  }
}
```

To run the script, use `deno task test`.

Do not forget to include necessary flags. For example, if the tests need file read and write permissions, you can modify the above task as follows:

```json
{
  "tasks": {
    "test": "deno run --allow-read --allow-write main.test.ts"
  }
}
```

#### Node

In Node.js, you can run scripts by using `node main.test.js` assuming `main.test.js` is the test file. You can create a script in `package.json` to avoid repetition. The script would look like the following:

```json
{
  "scripts": {
    "test": "node main.test.ts"
  }
}
```

To run the script, use `node run test`.

### Using the Test Runner

Refer to the documentation for the [test runner](./docs/test-runner.md).

## Output

### Syntax

The following is the syntax for the output of a test at any level:

```sh
OUTCOME (TESTS_PASSED/TOTAL) TIMEms [: DESCRIPTION]
```

where

- `OUTCOME` indicates whether the test passed or failed. It can either be `PASSED` or `FAILED`.
- `TESTS_PASSED` is the number of tests that have passed.
- `TOTAL` is the total number of tests.
- `TIME` is the time (in milliseconds) taken to run all tests at that level.
- `DESCRIPTION` is the description you provide for the test. It is optional.

### Examples

The following examples provide possible outputs for the test given in [Usage](#synchronous);

#### All Passed

```sh
PASSED (2/2) 5ms: isEven
  PASSED (2/2) 3ms: it returns true for multiples of 2
    PASSED (1/1) 1ms
    PASSED (1/1) 2ms
  PASSED (1/1) 2ms: it returns true for 0
    PASSED (1/1) 2ms
```

#### Some Passed

If a test fails, all tests at higher levels of that test are also considered to have failed.

```sh
FAILED (1/2) 5ms: isEven
  PASSED (2/2) 3ms: it returns true for multiples of 2
    PASSED (1/1) 1ms
    PASSED (1/1) 2ms
  FAILED (0/1) 2ms: it returns true for 0
    FAILED (0/1) 2ms: false is not equal to true
```

#### All Failed

```sh
FAILED (0/2) 5ms: isEven
  FAILED (0/2) 3ms: it returns true for multiples of 2
    FAILED (0/1) 1ms: false is not equal to true
    FAILED (0/1) 2ms: false is not equal to true
  FAILED (0/1) 2ms: it returns true for 0
    FAILED (0/1) 2ms: false is not equal to true
```

## API

Check out the [API documentation](./docs/api.md) for more.

## License

Apache 2.0.
