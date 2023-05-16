# test-js

A testing library for JavaScript that uses functional programming. The library works in Deno and Node.

## Features

- **Functional**: It uses functional programming. So, there are no hidden control flows. The tests run in the order you specify, and nothing apart from what you specify is run. This makes your test easier to reason about.
- **Behavior-driven Development (BDD)**: It uses behavior-driven development. This means that you test your code according to features or behavior and not implementation. This makes tests easier to write and testing code easier to maintain because even if the implementation changes, your tests don't have to change.
- **TypeScript**: It supports TypeScript out of the box.
- **Multiple JavaScript Environment**: It works in Deno, Node and in the browser.

## Architecture

The testing library is organized into five layers giving you an easy way to organize your tests.

```
|-- Package
|   |-- Module
|   |   |-- Suite
|   |   |   |-- Step
|   |   |   |   |-- Expectation
```

### Expectation

This the building block of all tests. It tests if a test meets a particular expectation. For example, if you are testing a function, you can test if the function returns a correct value for a specific input.

### Step

A group of related `Expectation`s. It tests if the test subject meets the requirements for a group of expectations. For example, if you are testing a function, you can test if the function returns the correct value for a group of inputs that are related.

### Suite

A group of related `Step`s. It tests if a particular feature is provided correctly by the test subject. For example, it can be used to test whether or not a function works correctly for its use case.

### Module

A group of related `Suite`s. It tests if a group of related features are provided correctly by the test subject. For example, you can use it to test if a group of related functions provide the expected features.

### Package

This is the top-most test. It is a group of `Module`s.

### API

- [expect]()
- [it]()
- [describe]()
- [mod]()
- [pack]()

## License

Apache 2.0.
