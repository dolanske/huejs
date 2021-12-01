import { h } from '../../hue/render.js'

export default {
  render() {
    return h(
      'span',
      {
        class: ['c-#fff', 'b-c-#000'],
      },
      'I am ABOUT route.'
    )
  },
}
