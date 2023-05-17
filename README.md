# test-js

A testing library for JavaScript that uses functional programming. The library works in Deno and Node.

## Features

- **Functional**: It uses functional programming. So, there are no hidden control flows. The tests run in the order you specify, and nothing apart from what you specify is run. This makes your test easier to reason about.
- **Behavior-driven Development (BDD)**: It uses behavior-driven development. This means that you test your code according to features or behavior and not implementation. This makes tests easier to write and testing code easier to maintain because even if the implementation changes, your tests don't have to change.
- **TypeScript**: It supports TypeScript out of the box.
- **Multiple JavaScript Environment**: It works in Deno, Node and in the browser.

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
// Deno and browser
import { describe, toEqual } from 'https://deno.land/x/test-js/mod.ts';

// Node ESM
// import { describe, toEqual } from '@test-bdd/test-js';

// Node CommonJS
// const { describe, toEqual } = require('@test-bdd/test-js');

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
// Deno and browser
import {
  describe,
  toBeGreaterThanOrEqual,
  toBeLessThan
} from 'https://deno.land/x/test-js/mod.ts';

// Node ESM
// import {
//   describe,
//   toBeGreaterThanOrEqual,
//   toBeLessThan
// } from '@test-bdd/test-js';

// Node CommonJS
// const {
//   describe,
//   toBeGreaterThanOrEqual,
//   toBeLessThan
// } = require('@test-bdd/test-js');

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

## API

Check out the [API documentation](./docs/api.md) for more.

## License

Apache 2.0.
