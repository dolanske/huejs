import { reactive } from '../../hue/reactive.js'
import { h } from '../../hue/render.js'

export default {
  data: reactive({
    amount: 10,
  }),
  render() {
    // setTimeout(() => {
    //   this.data.amount = 5
    // }, 1000)

    return h(
      'span',
      { onclick: () => (this.data.amount += 10) },
      `amount ${this.data.amount}`
    )
  },
}
