# Test Runner

The test runner is exported as `run`. You can use the test runner to run all tests
in a particular directory or a single file.

When you have a lot of test files, sometimes you just want to run the tests
for a particular file or group of files in the same directory.
These files may contain tests for a feature you are working on that is isolated
from other features.

Some tests may be so big that splitting them into multiple files may be a good idea.
However, running those files as a single test may be challenging.
So, you may need to import all related tests into one test file.
If you want to run all tests, you just run the single file.
And if you want run only one of the tests you can do so.

## Usage

The test runner can be used to solve the aforementioned problems.
Deno will be used to demonstrate the usage of the test runner.
However, the difference between the usage in different environments is small.
Let us assume that you have a package with the following file structure:

```
|-- src
|   |-- controllers
|   |   |-- authenticate
|   |   |   |-- email.test.ts
|   |   |   |-- email.ts
|   |   |   |-- o-auth.test.ts
|   |   |   |-- o-auth.ts
|   |   |   |-- authenticate.test.ts
|   |   |   |-- authenticate.ts
|   |   |-- sign-in
|   |   |   |-- sign-in.test.ts
|   |   |   |-- sign-in.ts
|   |   |-- sign-up
|   |   |   |-- sign-up.test.ts
|   |   |   |-- sign-up.ts
|   |   |-- validate
|   |   |   |-- phone.test.ts
|   |   |   |-- phone.ts
|   |   |   |-- email.test.ts
|   |   |   |-- email.ts
|   |   |   |-- validate.test.ts
|   |   |   |-- validate.ts
|   |   |-- controllers.test.ts
|   |   |-- controllers.ts
|   |-- models
|   |   |--models.test.ts
|   |   |--models.ts
|   |-- views
|   |   |-- views.test.ts
|   |   |-- views.ts
|-- deno.jsonc
|-- main.ts
|-- main.test.ts
|-- run-tests.ts
```

Now, let us filter the test files and look at how they are related.
Each file imports all files directly nested below it. For example,
`main.test.ts` imports `controllers.test.ts`, `models.test.ts`, and `views.test.ts`.

```
|-- main.test.ts
|   |-- controllers.test.ts
|   |   |-- authenticate.test.ts
|   |   |   |-- email.test.ts
|   |   |   |-- o-auth.test.ts
|   |   |-- sign-in.test.ts
|   |   |-- sign-up.test.ts
|   |   |-- validate.test.ts
|   |   |   |-- email.test.ts
|   |   |   |-- phone.test.ts
|   |-- models.test.ts
|   |-- views.test.ts
```

By running a particular test file, you would be running all the tests
in all the files that are imported by that file. This way,
you can run all related tests in one test file, and any file individually.
For this to happen, all files need to export a function that can be used to run
all tests in that file. And, all files that can be imported by other files
need to export another function that can be consumed by those files.

Following the architecture of the library, we may classify the test files as follows:

```
|-- Packages
|   |-- main.test.ts
.   .
|   |-- Modules
|   |   |-- controllers.test.ts
|   |   |-- models.test.ts
|   |   |-- views.test.ts
.   .   .
|   |   |-- Suites
|   |   |   |-- authenticate.test.ts
|   |   |   |   |-- email.test.ts
|   |   |   |   |-- o-auth.test.ts
|   |   |   |-- sign-in.test.ts
|   |   |   |-- sign-up.test.ts
|   |   |   |-- validate.test.ts
|   |   |   |   |-- email.test.ts
|   |   |   |   |-- phone.test.ts
```

## Suites

Let us start from the bottom. The suites will have test files
with the following general structure:

```ts
import { mod, type ModuleRunner } from 'https://deno.land/x/testjs/mod.ts';
import { testSubject } from './test-subject.ts';

// Runs the suites in this file
export const runModule: ModuleRunner = (describe) => {
  describe('testSubject', (it) => {
    it('should do something', (expect) => {
      // toDoSomething may be any assertion such as toBe
      expect(testSubject(), toDoSomething());
    });
  });
};

export const run = () => {
  mod('moduleName', runModule);
};
```

For example, the test file for `email.test.ts` imports its test subjects
from `email.ts`. The `testSubject` may be a function that checks if an email
has the correct format. The `toDoSomething` function may be the `toMatch` assertion.

Notice how `runModule` depends on `mod`. So, the module that imports `runModule`
will have to pass `runModule` as the second parameter to `mod`
like `run` did: `mod('moduleName', runModule)`.
The export `run` runs the tests in the current file directly.
This is the function that is used by the test runner.
You may name it anything you want.
But, you need to remember the name as you will see later.
If you create only one test runner, you need to use the same name in every file.
In this case every file would use `run`.

## Modules

All the modules will have the following general structure:

```ts
import { pack, type PackageRunner } from 'https://deno.land/x/testjs/mod.ts';
import { runModule } from './suite.test.ts';

// Runs the suites in this file and imported files
export const runPackage: PackageRunner = (mod) => {
  mod('moduleName', (describe) => {
    runModule(describe);
    // Run more suites
  });
};

export const run = () => {
  pack('packageName', runPackage);
};
```

Here, the same pattern is used. The export `runPackage` runs the tests
in this file. It depends on `pack`. It can be used by a package test file.
The export `run` runs tests in this module and provides `pack`.
It is used by the test runner to run the tests.

Notice how the module imports `runModule`. This is the export from a test suite,
like the one described before. So, the module can run suites from other files,
and/or its own suites.

## Packages

The final level is the package level. In this case,
there is only one file containing a package, `main.test.ts`.
The general structure of the file is as follows:

```ts
import { runControllers } from './src/controllers/controllers.test.ts';
import { runModels } from './src/models/models.test.ts';
import { runViews } from './src/views/views.test.ts';
import { pack } from 'https://deno.land/x/testjs/mod.ts';

// Runs the modules in this file and imported files
pack('packageName', (mod) => {
  runControllers(mod);
  runModels(mod);
  runViews(mod);
});
```

The file imports `runControllers`, `runModels`, and `runViews`
which are exported by modules as described above.
It then runs the imported modules. It can also run local modules if available.

Notice how it does not export anything. But,
the module will be imported with side effects by the test runner.
Which means that the code will be executed upon importing.

## Running the Tests

To run the tests you need to create a script that uses the test runner.
In our case, we can use `run-tests.ts` at the root directory
as shown in the file structure. The script will have the following general structure:

```ts
import {
  run,
  type ModuleImporter,
  type TestModule,
  type TestRunner
} from 'https://deno.land/x/testjs/mod.ts';

const { createTestRunner, isTSFile } = run;
const relative = '.'; // Relative path of entry directory
// Absolute path of entry directory
// Checkout run.getPaths for equivalent in Node
const absolute = new URL(relative, import.meta.url).pathname;
const entry = { relative, absolute };
const importModule: ModuleImporter = (path) => import(path);
// Assuming the test files export run
const getTestRunner = (mod: TestModule): TestRunner => mod.run;

const runTSTests = createTestRunner({
  entry,
  isMatch: isTSFile,
  importModule,
  getTestRunner
});

runTSTests();
```

To run the script, you can use Deno in the terminal as you would for any script.
To avoid repetition, you can write a task in `deno.jsonc` that would handle this.
The task would look like the following:

```json
{
  "tasks": {
    "test": "deno run --allow-read --allow-env run-tests.js"
  }
}
```

You can run the task by using `deno task test` in the terminal.
The flag `--allow-env` is added because you can provide
an optional environmental variable to the test runner.
The environmental variable is used to specify the entry point
starting from the entry point you specify using `entry`
as shown in the code snippet. For example, if you would like to run tests
in the directory `./src/controllers/validate`,
you would use `deno task test src/controllers/validate`.
You can provide a file path if you want to run tests in only one file.
Remember to include all the flags needed by all the test files.
