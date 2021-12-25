import { h } from '../hue/render.js'

import RouterView from '../hue/router/RouterView.js'
import RouterLink from '../hue/router/RouterLink.js'

import RouteHome from './route-containers/RouteHome.js'
import RouteAbout from './route-containers/RouteAbout.js'
import { addComponentStyle } from '../hue/style/css.js'

export default {
  render() {
    addComponentStyle('global', {
      selector: '#app',
      style: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        fontSize: '1.2rem',
        alignItems: 'center',
        backgroundColor: '#faffbb',
      },
      nested: [
        {
          selector: 'hr',
          style: {
            borderColor: '#000',
          },
        },
        {
          selector: '.router-link',
          style: {
            display: 'inline-block',
            margin: '0 8px',
          },
        },
      ],
    })

    return h('div', { class: ['p-32'] }, [
      RouterLink.render({ name: 'HelloHome', text: 'Home' }),
      RouterLink.render({ name: 'HelloAbout', text: 'About' }),
      h('hr'),
      RouterView.render(),
    ])
  },
}
