export function kebabize(str) {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  )
}

export function isObject(value) {
  let type = typeof value
  return value != null && (type == 'object' || type == 'function')
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isNil(value) {
  return value === undefined || value === null
}

export function from(n) {
  let arr = []

  for (let i = 1; i <= n; i++) {
    arr.push(i)
  }

  return arr
}
