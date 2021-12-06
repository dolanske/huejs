import { h } from '../hue/render.js'

import RouterView from '../hue/router/RouterView.js'
import RouterLink from '../hue/router/RouterLink.js'

import RouteHome from './route-containers/RouteHome.js'
import RouteAbout from './route-containers/RouteAbout.js'
import { createComponentStyles } from '../hue/style/css.js'

export default {
  render() {
    const inlineStyle = createComponentStyles(
      {
        selector: '.test-class',
        style: {
          marginLeft: '10px',
          backgroundColor: '#f0f',
        },
        children: [
          {
            selector: '.nested-class',
            style: {
              marginTop: '200px',
            },
          },
          {
            selector: '#app',
            style: {
              backgroundColor: '#000',
            },
            children: [
              {
                selector: '.henlo',
                style: {
                  fontSize: '20px',
                },
              },
            ],
          },
        ],
      },
      false
    )

    return h('div', { class: ['p-32'], style: inlineStyle }, [
      RouterLink.render({ name: 'HelloHome', text: 'Home' }),
      RouterLink.render({ name: 'HelloAbout', text: 'About' }),
      h('hr'),
      RouterView.render(),
    ])
  },
}
