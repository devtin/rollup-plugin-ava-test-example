/*!
 * rollup-plugin-ava-test-example v1.0.0
 * (c) 2020 Martin Rafael Gonzalez <tin@devtin.io>
 * MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ava-to-json/src/lib/utils/ava-patterns'), require('ava-to-json/src/lib/utils/strip-js-doc-comment'), require('ava-to-json'), require('fs-extra')) :
  typeof define === 'function' && define.amd ? define(['ava-to-json/src/lib/utils/ava-patterns', 'ava-to-json/src/lib/utils/strip-js-doc-comment', 'ava-to-json', 'fs-extra'], factory) :
  (global = global || self, global.ava2json = factory(global.avaPatterns, global.stripJsDocComment, global.avaToJson, global.fsExtra));
}(this, (function (avaPatterns, stripJsDocComment, avaToJson, fsExtra) { 'use strict';

  function jsCodeToMd (jsCode) {
    const pattern = new RegExp(avaPatterns.avaPatterns.findComment, 'msgi');
    return [
      '```js\n',
      jsCode.replace(pattern, (match, comment) => {
        return '\n```\n\n' + stripJsDocComment.stripJsdocComment(comment) + '\n\n```js\n'
      }),
      '\n```']
      .join('')
      .replace(/[\n]*```js\n\n```[\n]*/mgs, '\n\n')
      .replace(/```js[\n]+/g, '```js\n')
      .replace(/[\n]*```$/mgs, '\n```')
  }

  /**
   * Parses give {@link AvaTest} into a js-doc example
   * @param {AvaTest} AvaTest - The {@link AvaTest}
   * @param {Object} [options]
   * @param {Boolean|Function} [options.codeParser] - Function that resolved the coee
   * @return {String} The markdown string
   * @example-test
   */
  function avaTestToExample (AvaTest, { codeParser = jsCodeToMd } = {}) {
    const { title, description, code } = AvaTest;

    const example = [`@example <caption>${ title }</caption>`, ''];
    description && example.push(description, '');
    example.push(codeParser(code));

    return example.join(`\n`)
  }

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
  function rollupPluginAvaTestExample ({ suffix = `.unit.js`, extensions = ['.js'], ava2jsonOptions, jsdocTag = '@example-test' } = {}) {
    return {
      name: 'rollup-plugin-ava-test-example',
      async transform (code, id) {
        const extension = id.replace(/^.+(\.[a-z0-9]+)$/, '$1');

        if (extension && extensions.indexOf(extension) >= 0) {
          const unit = id.replace(new RegExp(`\\${ extension }$`), suffix);
          if (await fsExtra.pathExists(unit)) {
            const examples = (await avaToJson.parseFile(unit, ava2jsonOptions)).map(avaTestToExample);
            const finalExample = examples.join('\n\n').split('\n').map(l => ` * ${ l }`).join('\n');
            code = code.replace(new RegExp(`^ \\* ${ jsdocTag }+$`, 'mg'), finalExample);
          }
          return { code }
        }
        return null
      }
    }
  }

  return rollupPluginAvaTestExample;

})));
