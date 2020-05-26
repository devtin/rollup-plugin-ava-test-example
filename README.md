# rollup-plugin-ava-test-example
> Injects JavaScript code from AVA unit test files into JSDoc examples

[![tests](https://github.com/devtin/rollup-plugin-ava-test-example/workflows/test/badge.svg)](https://github.com/devtin/rollup-plugin-ava-test-example/actions)

This rollup plugin does the following:

- Checks if the incoming file is a `.js` file (configurable via `extensions` setting)
- Checks if the file contains the JSDoc comment tag `@example-test` (configurable via `jsdocTag` setting)
- Checks if a file exists within the same directory of the input file, using the same name but with the suffix
`.unit.js` (configurable via `suffix` setting)
- Parses the AVA unit test file using [ava-to-json](https://github.com/devtin/ava-to-json)
- Maps the array of the parsed tests using the following nomenclature: 
```txt
    @example <caption>{{ test-name }}</caption>

    ```js
    {{ test-code }}
    ```
```
- Joins the array using two new lines and replaces the found JSDoc tag `@example-test` in the given input with
this computed string.

### Setup

*rollup.config.js*
```js
import AvaTestExample from 'rollup-plugin-ava-test-example'

const plugins = [
  AvaTestExample({
    // suffix: '.unit.js', // unit tests suffix
    // extensions: ['.js'], // file extensions to transform
    // ava2jsonOptions: {}, // ava2json options: https://github.com/devtin/ava-to-json
    // jsdocTag: '@example-test', // the jsdocTag to look for
  })
]

export default {
  input: 'src/my-function.js',
  output: [
    {
      file: `dist/my-function.js`,
      format: 'esm'
    },
  ],
  plugins
}
```


*src/my-function.js* (entry point)
```js
/**
 * Adds a + b
 * @example-test
 */
export function myFunction (a, b) {
  return a + b
}
```

*src/my-function.unit.js* (AVA unit test)
```js
import test from 'ava'

test(`Add a with b`, t => {
  t.is(add(1, 2), 3)
  t.not(add(2, 2), 5) // two and two NOT always makes a 5 ):
})
```

*dist/my-function.unit.js* (output)
```js
/**
 * Adds a + b
 * @example <caption>Add a with b</caption>
 * 
 * ```js
 * t.is(add(1, 2), 3)
 * t.not(add(2, 2), 5) // two and two NOT always makes a 5 ):
 * ```
 */
export function myFunction (a, b) {
  return a + b
}
```

* * *

### License

[MIT](https://opensource.org/licenses/MIT)

&copy; 2020-present Martin Rafael Gonzalez
<tin@devtin.io>
