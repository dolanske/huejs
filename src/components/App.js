import { h } from '../hue/render.js'
import { addComponentStyle, addMixin, getMixin, nth } from '../hue/style/css.js'
import { color } from '../script/color.js'

import PageIndicator from './portfolio/PageIndicator.js'
import SectionLanding from './portfolio/SectionLanding.js'

export default {
  render() {
    addMixin('font', ({ type = 'regular', size } = {}) => ({
      fontFamily: `'Helvetica LT W01 ${
        type === 'regular' ? 'Roman' : 'Bold'
      }', sans-serif`,
      fontWeight: 400,
      fontSize: size,
    }))

    addComponentStyle({
      selector: '.app-wrap',

      style: {
        display: 'block',
        backgroundColor: color('black'),
        fontSize: '63.5%',
      },
    })

    return h('div', { class: 'app-wrap' }, [
      PageIndicator.render(),
      SectionLanding.render(),
    ])
  },
}
