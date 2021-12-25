import { h } from '../../hue/render'
import { addComponentStyle, getMixin } from '../../hue/style/css'
import { color } from '../../script/color.js'

export default {
  render() {
    addComponentStyle({
      selector: '.section-landing',
      style: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
      },
    })

    addComponentStyle({
      selector: 'h1',
      style: {
        color: color('white'),
        ...getMixin('font', { size: '6rem', type: 'bold' }),
      },
    })

    return h('div', { class: 'section-landing' }, [h('h1', 'HUE.JS')])
  },
}
