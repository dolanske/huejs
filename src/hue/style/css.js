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

// const style = new Set()
// let prevStyle = new Set()
let nextStyle = new Set()
let stylesToCompile = new Set()
let styleElement = null

export const addStyle = (style) => stylesToCompile.add(style)
export const addStyles = (styles) =>
  styles.map((item) => stylesToCompile.add(item))

// Removes any invalid characters from a class name
export const formatInvalidChar = (value) => {
  // Get the character which the value contains
  const invalid = invalidChars.find((char) => value.includes(char))

  // If it contains any, replace it with ''
  if (invalid) return value.replace(invalid, '')

  return value
}

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
  const className = formatInvalidChar(style.split(':')[0])

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

export const initStyleGenerator = () => {
  const id = 'generated-css'

  if (!styleElement) {
    // Append styles to the body
    const style = document.createElement('style')
    style.setAttribute('id', id)
    document.head.appendChild(style)

    styleElement = style
  }
}

const replaceInnerStyle = () => {
  styleElement.innerText = ''
  styleElement.appendChild(document.createTextNode([...nextStyle].join('')))
}

/**
 * CSS generator function, called each time the DOM
 * is updated. Loops over stylesToCompile and makes sure
 * no class is generated twice and that unused classes are
 * automatically removed.
 */
export const generateCSS = () => {
  // Loop over
  for (const key of stylesToCompile) {
    nextStyle.add(createStyle(key))
  }

  replaceInnerStyle()

  // prevStyle = nextStyle
  // nextStyle.clear()
  stylesToCompile.clear()
}
