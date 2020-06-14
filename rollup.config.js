import { name, version, author, license } from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const initialYear = 2020
const yearsActive = new Date().getFullYear() !== initialYear ? `${ initialYear }-${ new Date().getFullYear() }` : initialYear

const banner = `/*!
 * ${ name } v${ version }
 * (c) ${ yearsActive } ${ author }
 * ${ license }
 */`

export default [
  {
    input: 'src/rollup-plugin-ava-test-example.js',
    output: [
      {
        file: `dist/rollup-plugin-ava-test-example.js`,
        format: 'cjs',
        banner
      },
    ],
    plugins: [
      commonjs({
        include: 'node_modules/**'
      }),
      resolve()
    ]
  }
]
