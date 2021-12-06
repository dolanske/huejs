import { watchEffect } from '../reactive.js'
import {
  createStyleComponent,
  formatAddedStyleNode,
  generateClassStyles,
} from '../style/css.js'
import { Node } from './types.js'

export function h(
  tag: string,
  props: string | object | undefined,
  children: Array<string | object> | undefined | string
) {
  // Support for ommiting props
  // Eg. h('p', 'hello world') will treat it as if only tag & children were entered
  if (typeof props === 'string') {
    children = props
    props = {}
  }

  // Convert any non-array children to string for the HTML node creation
  if (!Array.isArray(children) && children) children = `${children}`

  return {
    tag,
    props,
    children
  }
}
