import { avaTestToExample } from './lib/ava-test-to-example'
import { parseFile as parseAvaFile } from 'ava-to-json'
import { pathExists } from 'fs-extra'

/**
 * Embeds corresponding unit tests into the js-doc @example-test tag of a javascript file
 * @param {Object} options
 * @param {String} [options.suffix=.unit.js]
 * @param {String[]} [options.extensions=['.js']]
 * @param {Object} [options.ava2jsonOptions]
 * @param {Object} [options.jsdocTag=@example-test]
 * @return {Function}
 * @see https://github.com/devtin/ava-to-json
 * @example-test
 */
export default function ({ suffix = `.unit.js`, extensions = ['.js'], ava2jsonOptions, jsdocTag = '@example-test' } = {}) {
  return {
    name: 'rollup-plugin-ava-test-example',
    async transform (code, id) {
      const extension = id.replace(/^.+(\.[a-z0-9]+)$/, '$1')

      if (extension && extensions.indexOf(extension) >= 0) {
        const unit = id.replace(new RegExp(`\\${ extension }$`), suffix)
        if (await pathExists(unit)) {
          const examples = (await parseAvaFile(unit, ava2jsonOptions)).map(avaTestToExample)
          const finalExample = examples.join('\n\n').split('\n').map(l => ` * ${ l }`).join('\n')
          code = code.replace(new RegExp(`^ \\* ${ jsdocTag }$`, 'mg'), finalExample)
        }
        return { code }
      }
      return null
    }
  }
}
