import { h } from '../render.js'
import { reactive, watchEffect } from '../reactive.js'
import { useRoute } from './router.ts'

export default {
  render(props = {}) {
    const route = useRoute()

    return h('div', { ...Object.assign(props, route ? route.props : {}) }, [
      route.container.render(),
    ])
  },
}
