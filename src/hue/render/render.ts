// import { watchEffect } from '../reactive.js'
// import {
//   createStyleComponent,
//   formatAddedStyleNode,
//   generateClassStyles,
// } from '../style/css.js'
import { Node } from './types.js'
import { isNil } from '../utils.js'

export function h(
  tag: string,
  props: string | object | undefined | Array<string | object> ,
  children: Array<string | object> | undefined | string
): Node {
  // We can omit prps when calling the function
  if (
    typeof props === 'string' ||
    typeof props === 'number' ||
    Array.isArray(props)
  ) {
    children = props
    props = {}
  }

  // Convert any non-array children to string for the HTML node creation
  if (!isNil(children)) {
    if (!Array.isArray(children)) {
      children = `${children}`
    } else if (typeof children[0] === 'string') {
      children = children[0]
    }
  }

  return {
    tag,
    props,
    children
  }
}
