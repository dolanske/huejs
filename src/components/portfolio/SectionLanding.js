import { h } from '../../hue/render/render'
import { setStyle, getMixin } from '../../hue/style/css'
import { color } from '../../script/color.js'

import logo from '../../assets/img/logo.png'

export default {
  render() {
    setStyle({
      selector: '.section-landing',
      style: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        gap: '80px',
        justifyContent: 'center',
      },
      nested: [
        {
          selector: 'h1',
          style: {
            color: color('white'),
            ...getMixin('font', { size: '6rem', type: 'bold' }),
          },
        },
        {
          selector: 'p',
          style: {
            color: color('white'),
            ...getMixin('font', { size: '0.8rem' }),
          },
        },
        {
          selector: 'img',
          style: {
            width: '256px',
            height: '256px',
          },
        },
      ],
    })

    return h('div', { class: 'section-landing' }, [
      h('img', { src: logo }, null),
      h('div', [
        h('h1', 'HUE.JS'),
        h(
          'p',
          '= Honza (me) & Vue js (biggest inspiration and an awesome framework)'
        ),
      ]),
    ])
  },
}
