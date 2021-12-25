import { isObject, kebabize } from '../utils.js'
import {
  matchBase,
  matchModifiers,
  supportedUnits,
  invalidChars,
} from './types.js'

/**
 * CSS style class generator on demand. On each DOM update, it collects all
 * class names found within node props and generates CSS values according
 * to the class name.
 *
 * This is not meant to replace CSS styling completely, but to create an
 * atomic css solution for generic styles.
 */

let nextStyle = new Set()
let stylesToCompile = new Set()
const styles = {}
const mixins = {}

/*----------  Helpers & Css in comment generator  ----------*/

export const addStyle = (style) => stylesToCompile.add(style)
export const addStyles = (styles) =>
  styles.map((item) => stylesToCompile.add(item))

// Removes any invalid characters from a class name
const sanitizeClassName = (value) => {
  // Get the character which the value contains
  const invalid = invalidChars.find((char) => value.includes(char))

  // If it contains any, replace it with ''
  if (invalid) return value.replace(invalid, '')

  return value
}

/**
 * Adds a mixin, which when called simply returns a style object the same way
 * as if we were creating a new component style. We can also make it dynasmic by
 * passing in an object of parameters.
 */

export const addMixin = (name, styleFunc) => (mixins[name] = styleFunc)
export const getMixin = (name, params) => mixins[name]({ ...params })

/**
 * We take class value. Check the value's type and determine, if unit can
 * even be applied. If yes, we also check if the provided unit type is even
 * supported. If this fails, we fallback to default type: _px_
 */
const formatUnit = (val) => {
  const fallback = 'px'
  const [value, unit] = val.split(':')

  // If no unit is provided and value is a number
  if (!unit) {
    if (Number(value)) return fallback
    else return ''
  }

  if (supportedUnits.includes(unit)) return unit
  return ''
}

const createStyle = (style) => {
  let base = null
  let modifier = null
  let value = null

  const parts = style.split('-')
  const dashes = parts.length - 1
  const className = sanitizeClassName(style.split(':')[0])

  /**
   * If only one dash is present in the split, we can assume that what's
   * before it is a base.
   */

  if (!matchBase[parts[0]]) return ''

  switch (dashes) {
    case 1:
      base = matchBase[parts[0]]
      value = parts[1]
      break
    case 2:
      base = matchBase[parts[0]]
      modifier = matchModifiers[parts[1]]
      value = parts[2]
      break
    default:
      // Figure out edge cases later LOL
      break
  }

  const [actualValue] = value.split(':')

  return `
    .${className} { 
      ${base}${modifier ? '-' + modifier : ''}: 
      ${actualValue}${formatUnit(value)}; 
    }
  `
}

/**
 * Helper function that checks if input style is an array
 * or simple string and format's components class prop accordingly
 * while also adding the class(es) to the generator.
 *
 * It is only used to format class names during rendering,
 * so it isn't part of the css module.
 */
export function formatAddedStyleNode(value) {
  if (Array.isArray(value)) {
    addStyles(value)
    return value.map((item) => sanitizeClassName(item.split(':')[0])).join(' ')
  }

  addStyle(value)

  return sanitizeClassName(value.split(':')[0])
}

/*----------  DOM Manipulation  ----------*/

/**
 * Append new style component to the DOM.
 *
 * @param {String | Number} id
 */
export const createStyleComponent = (id) => {
  if (styles[id]) return

  const newStyle = document.createElement('style')
  newStyle.setAttribute('id', id)
  document.head.appendChild(newStyle)
  styles[id] = newStyle
}

export const updateStyleComponent = (id, content) => {
  styles[id].innerText = ''
  styles[id].appendChild(document.createTextNode(content))
}

/**
 * CSS generator function, called each time the DOM
 * is updated. Loops over stylesToCompile and makes sure
 * no class is generated twice and that unused classes are
 * automatically removed.
 */
export const generateClassStyles = (id) => {
  // Loop over
  for (const key of stylesToCompile) {
    nextStyle.add(createStyle(key))
  }

  updateStyleComponent(id, [...nextStyle].join(''))
  stylesToCompile.clear()
}

/*----------  In component generated styles  ----------*/

// TODO: Add new documentaion to this function
// When compiler is a thing, it should automatically use scopeId
// returned from the function and assign its class name to the
//
export const addComponentStyle = (type, data) => {
  /**
   * Default binding, if we want to add a global style object.
   * We simply omit the type. But it must be checked for and
   * assign the parameters corrently after
   */
  if (isObject(type)) {
    data = type
    type = 'global'
  }

  switch (type) {
    // Add global style tag, class and styles will be available globally
    case 'global': {
      const css = generateCssFromObject(data)

      createStyleComponent(data.selector)
      updateStyleComponent(data.selector, css)

      break
    }

    // Add scoped style, class and it's children only affect 1 component or its children
    case 'scoped': {
      data.selector =
        data.selector + '-' + String(Math.random().toFixed(8)).slice(2)
      const css = generateCssFromObject(data)
      createStyleComponent(data.selector)
      updateStyleComponent(data.selector, css)

      // Return scoped class name to be used within the component
      // Also need to slice
      return data.selector.replace(/([#.])/, '')
    }

    // Generate and return formatted inline styles
    case 'inline': {
      return generateInlineStyles(data)
    }
  }
}

const generateCssFromObject = (data) => {
  let css = ''

  /**
   * We need to add a selector, add { after it
   * then loop over the style object and format the CSS values
   * If no nested array is provided, close the class with }
   */

  const styleCssNode = (node) => {
    // TODO: During recursive calls, must apply previous css selectors
    // Currently this function actually returns SCSS
    // let nestedSelector = node.selector

    css += node.selector + '{'
    css += generateInlineStyles(node.style)

    if (node.nested) {
      // Loop over nested children and call this function again
      node.nested.forEach((child) => styleCssNode(child))
    }

    css += '}'
  }

  styleCssNode(data)

  return css
}

const generateInlineStyles = (data) => {
  if (!isObject(data)) return ''

  let style = ''

  // Checks if we are passing in the same object as we'd use for actual css generation
  // It's just a safety check, because this function is ran if scoped = false
  const styleObject = data.style ? data.style : data

  if (Object.keys(styleObject).length === 0) return ''

  Object.entries(styleObject).forEach((entry) => {
    const [index, value] = entry
    style += kebabize(index) + ':' + value + ';'
  })

  return style
}
