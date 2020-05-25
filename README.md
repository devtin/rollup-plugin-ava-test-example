# rollup-plugin-ava-test-example
[![tests](https://github.com/devtin/rollup-plugin-ava-test-example/workflows/test/badge.svg)](https://github.com/devtin/rollup-plugin-ava-test-example/actions)

Have you ever wondered how to keep sync your unit-tests and your js-doc examples? Well I have had and that is the reason
why I started this plugin.

### Usage

*rollup.config.js*
```js
import AvaTestExample from 'rollup-plugin-ava-test-example'

const plugins = [AvaTestExample({
  // suffix: '.unit.js', // unit tests suffix
  // extensions: ['.js'], // file extensions to transform
  // ava2jsonOptions: {}, // ava2json options: https://github.com/devtin/ava-to-json
})]

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
 * `\`\`\``
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
