import App from './components/App.js'
import { mountApp } from './hue/render.js'
import { Route } from './hue/router/types.js'

//@ts-ignore
import { createRouter } from './hue/router/router.ts'
import RouteHome from './components/route-containers/RouteHome.js'
import RouteAbout from './components/route-containers/RouteAbout.js'
// import { createStore } from './store/store.js'


/**
 * ---------------- State ----------------
 */

// createStore({
//   id: 'counter',
//   state: {
//     count: 0,
//   },
//   actors: {
//     add({ state }) {
//       state.count++
//     },
//   },
//   getters: {
//     getCount: (state) => state.count,
//   },
// })

/**
 * ---------------- Router ----------------
 */

createRouter({
  routes: [
    {
      path: '/',
      default: true,
      redirect: '/home',
    },
    {
      name: 'HelloHome',
      path: '/home',
      title: 'Home Route',
      container: RouteHome,
      /**
       * Router also allows free passing of any props you want.
       * These will be reflected during rendering of containers.
       *
       * This supports custom props, event listeners and also
       * native prop types. Eg id, class, title and so on
       */
      props: {
        class: 'container-home',
      },
    },
    {
      name: 'HelloAbout',
      path: '/about',
      title: 'About Route',
      container: RouteAbout,
    },
  ],
  // beforeEnter: (prev: Object, current: Object) => {
  //   return true
  // },
  onEnter: (from: Route, to: Route) => {
    //@ts-ignore
    document.title = to.title
  },
})

/**
 * ---------------- Application mount ----------------
 */

mountApp(App, document.getElementById('app'))
