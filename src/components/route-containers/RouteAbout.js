import { h } from '../../hue/render.js'
import { useRoute } from '../../hue/router/router.ts'

export default {
  render() {
    // const {} = useRoute()

    return h(
      'div',
      {
        class: ['c-#fff', 'b-c-#000'],
      },
      `im about route`
    )
  },
}
