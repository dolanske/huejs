import { h } from '../render.js'
import { reactive, watchEffect } from '../reactive.js'
import { useRoute } from './router.js'

export default {
  data: reactive({
    component: '',
  }),
  render(props = {}) {
    const route = useRoute()
    // FIXME
    // Figured out the issue. For some reason nested routes don't get re-rendered
    // on data updates. So this fix takes the highest prirotiy

    watchEffect(() => {
      this.data.component = route.container
    })

    return this.data.component.render()

    // return h('div', { ...Object.assign(props, route ? route.props : {}) }, [
    //   this.data.component.render(),
    // ])
  },
}
