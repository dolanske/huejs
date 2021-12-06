import { reactive } from '../../hue/reactive.js'
import { h } from '../../hue/render.js'

export default {
  data: reactive({
    amount: 10,
  }),
  render() {
    return h(
      'span',
      { onClick: () => (this.data.amount += 10) },
      `amount ${this.data.amount}`
    )
  },
}
