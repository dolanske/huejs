import { watchEffect } from './reactive.js'
import {
  initStyleGenerator,
  generateCSS,
  addStyle,
  addStyles,
  formatInvalidChar,
} from './style/css.js'

/**
 * Helper function that checks if input style is an array
 * or simple string and format's components class prop accordingly
 * while also adding the class(es) to the generator.
 *
 * It is only used to format class names during rendering,
 * so it isn't part of the css module.
 */
function formatAddedStyleNode(value) {
  if (Array.isArray(value)) {
    addStyles(value)
    return value.map((item) => formatInvalidChar(item.split(':')[0])).join(' ')
  }

  addStyle(value)

  return formatInvalidChar(value.split(':')[0])
}

/**
 * ---------------- RENDERING API ----------------
 */

// export function h(tag: String, props: String | Object | null , children: Array<String | Function> | String | null) {
export function h(tag, props, children) {
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
    children,
  }
}

// Mount function which appends a new element to the real DOM
function mount(vnode, container) {
  // We assign it to vnode.el to also compare when we use the patch function

  const el = (vnode.el = document.createElement(vnode.tag))

  // Props
  if (vnode.props) {
    for (const key in vnode.props) {
      let value = vnode.props[key]

      // for CSS.js compiling
      if (key === 'class' && value) {
        value = formatAddedStyleNode(value)
      }

      // Check for event listeners
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  // Children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      // If child is just a text, add it to the element
      el.textContent = vnode.children
    } else {
      // If its an array, call itself and repeat the process
      vnode.children.forEach((child) => {
        // TODO: Add support for simple text children

        mount(child, el)
      })
    }
  }

  // Append child
  container.appendChild(el)
}

// Instead of rerendering the whole dom tree,
// if we detect a change inside an existing element,
// we can 'patch' up these changes by simply replaceing
// its inner values / props
function patch(n1, n2) {
  if (n1.tag === n2.tag) {
    const el = (n2.el = n1.el)
    //props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    for (const key in newProps) {
      const oldValue = oldProps[key]
      let newValue = newProps[key]
      if (newValue !== oldValue) {
        // for CSS.js compiling
        if (key === 'class' && newValue) {
          newValue = formatAddedStyleNode(newValue)
        }

        el.setAttribute(key, newValue)
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    // children
    const oldChildren = n1.children || ''
    const newChildren = n2.children || ''

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      } else {
        el.textContent = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') {
        el.innerHTML = ''
        newChildren.forEach((child) => {
          mount(child, el)
        })
      } else {
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((child) => {
            mount(child, el)
          })
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((child) => {
            el.removeChild(child.el)
          })
        }
      }
    }
  } else {
    // Both vnodes are different tags
    // REVIEW: Must make sure things work
    // This is the first working implementation
    // and probably will need tweaking

    const parent = n1.el.parentNode
    parent.removeChild(n1.el)

    mount(n2, parent)
  }
}

function showVirtualDom(component) {
  mount(
    h('pre', {}, JSON.stringify(component.render())),
    document.getElementById('app')
  )
}

export function mountApp(
  App,
  container,
  { onInit, onCreated, onUpdated } = {}
) {
  /** Life cycle hook: onInit */
  if (onInit) onInit()

  let isMounted = false
  let prevVdom
  initStyleGenerator()

  watchEffect(() => {
    if (!isMounted) {
      prevVdom = App.render()
      mount(prevVdom, container)
      isMounted = true

      if (onCreated) onCreated()
    } else {
      const newVdom = App.render()
      patch(prevVdom, newVdom)
      prevVdom = newVdom

      /** Life cycle hook: onUpdated */
      if (onUpdated) onUpdated()
    }

    // mounted()
    generateCSS()
  })
}
