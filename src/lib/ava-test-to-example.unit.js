import { avaTestToExample } from './ava-test-to-example'
import { parseFile as parseAvaFile } from 'ava-to-json'
import test from 'ava'
import path from 'path'

test(`Converts an ava test into a js-doc example`, async t => {
  const tests = await parseAvaFile(fixturePath('sample.test.js'))
  const example = avaTestToExample(tests[0])
  t.log(example)
  t.truthy(example)
  t.snapshot(example)
})
