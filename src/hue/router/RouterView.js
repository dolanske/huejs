import { h } from '../render.js'
import { reactive, watchEffect } from '../reactive.js'
import { useRoute } from './router.ts'

export default {
  render(props = {}) {
    const route = useRoute()
    // FIXME
    // Figured out the issue. For some reason nested routes don't get re-rendered
    // on data updates. So this fix takes the highest prirotiy

    // watchEffect(() => {
    //   this.data.component = route.container
    // })

    return h('div', { ...Object.assign(props, route ? route.props : {}) }, [
      route.container.render(),
    ])
  },
}
