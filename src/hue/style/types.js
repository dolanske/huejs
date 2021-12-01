// prettier-ignore

/**
 * Using the mb-10 formula, which would generate 'margin-bottom: 10px' requires
 * for us to support multi-letter base, which would require another type checking before.
 *
 * If we split base, modifier and value by dash, this problem gets solved, as now
 * base or modifiers can both be multi letters without us having to detect, what is part
 * of what.
 *
 * Issue this solves:
 *
 *  "fs-16:unit"
 *
 * If we split fs by base and modifier, we are left with _f_ and _s_. F as a base makes sense.
 * It just stands as font, but what if something else has a base of f? We then rely on modifier,
 * but the purpose of modifiers is to stay as generic as possible.
 *
 * Therefore base should solve this issue. But there is no way for us to know, what part of the text before - is base and
 * what part is modifier. We would require ANOTHER checker, which has these values
 * predefined. And that defeats the purpose, to generate simple class styling.
 *
 * So the format we'll go with is:
 *
 *  "base-modifier-value:unit"
 *
 * Now we clearly defined the bounds of base and modifier and we can avoid any confusion.
 * Using that formula, let's generating margin-bottom: 1.5em;
 *
 *  "m-b-10:em"
 */

export const matchBase = {
  p:  'padding',
  m:  'margin',
  d:  'display',
  fs: 'font-size',
  c:  'color',
  b:  'background',
  ai:  'align-items',
  gap: 'gap',

}

export const matchModifiers = {
  l: 'left',
  r: 'right',
  t: 'top',
  b: 'bottom',
  c: 'color',
}

export const supportedUnits = ['px', 'em', 'rem', 'vw', 'vh', '%']

export const invalidChars = ['#']
