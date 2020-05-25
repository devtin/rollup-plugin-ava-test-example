import { avaPatterns } from 'ava-to-json/src/lib/utils/ava-patterns'
import { stripJsdocComment } from 'ava-to-json/src/lib/utils/strip-js-doc-comment'

export function jsCodeToMd (jsCode) {
  const pattern = new RegExp(avaPatterns.findComment, 'msgi')
  return [
    '```js\n',
    jsCode.replace(pattern, (match, comment) => {
      return '\n```\n\n' + stripJsdocComment(comment) + '\n\n```js\n'
    }),
    '\n```']
    .join('')
    .replace(/[\n]*```js\n\n```[\n]*/mgs, '\n\n')
    .replace(/```js[\n]+/g, '```js\n')
    .replace(/[\n]*```$/mgs, '\n```')
}
