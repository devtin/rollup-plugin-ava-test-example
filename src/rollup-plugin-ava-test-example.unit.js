import test from 'ava'
import at2e from './rollup-plugin-ava-test-example.js'
import fs from 'fs'
import path from 'path'

test(`Rollup plugin transforms example code of files with local unit test`, async t => {
  // instantiate plugin
  const plugin = at2e()

  // mock
  const id = path.join(__dirname, './rollup-plugin-ava-test-example.js')
  const code = fs.readFileSync(id).toString()

  // emulate call
  const res = await plugin.transform(code, id)

  // test
  t.truthy(res.code)
  t.snapshot(res.code)
})
