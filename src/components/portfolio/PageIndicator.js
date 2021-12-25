import { h } from '../../hue/render/render'
import { addComponentStyle } from '../../hue/style/css'
import { from } from '../../hue/utils'
import { color } from '../../script/color'

export default {
  render() {
    addComponentStyle({
      selector: '.navigation',
      style: {
        position: 'fixed',
        right: '80px',
        bottom: '80px',
        listStyle: 'none',
        color: color('white'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      },
      nested: [
        {
          selector: 'li:nth-child(odd)',
          style: {
            width: '16px',
            height: '16px',
            border: `1px solid ${color('border')}`,
            borderRadius: '50%',
          },
        },
        {
          selector: 'li:nth-child(even)',
          style: {
            height: '80px',
            borderRight: `1px solid ${color('border')}`,
          },
        },
      ],
    })

    const li = from(7).map((item) => h('li', { 'data-title': 'Test' }))

    return h('ul', { class: 'navigation' }, li)
  },
}
