import { h } from '../hue/render.js'

import RouterView from '../hue/router/RouterView.js'
import RouterLink from '../hue/router/RouterLink.js'

import RouteHome from './route-containers/RouteHome.js'
import RouteAbout from './route-containers/RouteAbout.js'

export default {
  render() {
    return h('div', { class: ['p-32'] }, [
      RouterLink.render({ name: 'HelloHome', text: 'Home' }),
      RouterLink.render({ name: 'HelloAbout', text: 'About' }),
      h('hr'),
      RouterView.render(),
    ])
  },
}
