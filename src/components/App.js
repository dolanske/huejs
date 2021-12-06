import { h } from '../hue/render.js'

import RouterView from '../hue/router/RouterView.js'
import RouterLink from '../hue/router/RouterLink.js'

import RouteHome from './route-containers/RouteHome.js'
import RouteAbout from './route-containers/RouteAbout.js'
import { createComponentStyles } from '../hue/style/css.js'

export default {
  render() {
    const style = createComponentStyles('test', {
      selector: '#app',
      style: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f',
      },
    })

    return h('div', { class: ['p-32', style] }, [
      RouterLink.render({ name: 'HelloHome', text: 'Home' }),
      RouterLink.render({ name: 'HelloAbout', text: 'About' }),
      h('hr'),
      RouterView.render(),
    ])
  },
}
