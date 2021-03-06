import { h } from '../render.js'
import { useRoute } from './router.ts'

export default {
  render(props = {}) {
    const route = useRoute()

    return h('div', { ...props }, [route.container.render({ ...route.props })])
  },
}
