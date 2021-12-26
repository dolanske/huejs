import { h } from '../../hue/render/render'
import { setStyle, nth, useString } from '../../hue/style/css'
import { from } from '../../hue/utils'
import { color } from '../../script/color'

export default {
  render() {
    setStyle({
      selector: '.navigation',
      style: {
        position: 'fixed',
        right: '80px',
        bottom: '80px',
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      },
      nested: [
        {
          selector: 'li',
          self: {
            ...nth('child', 'odd', {
              width: '16px',
              height: '16px',
              border: `1px solid ${color('border')}`,
              borderRadius: '50%',
              cursor: 'pointer',
            }),
            ...nth('child', 'even', {
              height: '80px',
              borderRight: `1px solid ${color('border')}`,
            }),
            hover: {
              backgroundColor: color('background'),
            },
          },
        },
      ],
    })

    const li = from(7).map((item) => h('li', { 'data-title': 'Test' }))

    return h('ul', { class: 'navigation' }, li)
  },
}
