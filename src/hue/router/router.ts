import { ref } from '../reactive.js'
interface Route {
  path?: string,
  container?: object | Function,
  name?: string,
  props?: object,
  title?: string,
  redirect?: string,
  default?: boolean,
  query?: string,
}

interface Router {
  routes: Array<Route>,
  beforeEnter(from: Route, to: Route): Function,
  onEnter(from: Route, to: Route): Function,
}

export const createRouter = (data: object) => {
  let activeRoute = ref({})

  const { beforeEnter, onEnter, routes } = data as Router

  const getRoute = ({ by, value }: {by: string, value: string|number}): Route | undefined => {
    return routes.find((route: Route | any) => route[by] === value)
  }

  const back = () => window.history.go(-1)
  const go = (n: number) => window.history.go(n)

  /**
   * Push method. Used to change current route. Accepts an object as parameter.
   * If only _path_ or _name_ parameters are provided, it first checks if any
   * route matches these parameters and then returns it.
   *
   * If object contains redirects, it needs to provide other existing route's
   * path to match against.
   */
  const push = (route: Route) => {
    if (!route) return

    /**
     * First we need to see, if we used push function with a full route object.
     * In case we only used it with name / path, we need to return a full object
     *
     * This section also serves as a sort of try / catch to detect any issues with
     * the route being push. We check for if pushed route is currently active.
     * Or if it doesnt exist at all after we've searched for it
     */

    if (route.name && !route.path)
      route = getRoute({ by: 'name', value: route.name }) as Route
    if (!route) return

    if (route.redirect) {
      const redirect: Route | undefined = getRoute({ by: 'path', value: route.redirect })
      if (redirect) push(redirect)
      return
    }

    if (
      route?.name === activeRoute.value.name ||
      route?.path === activeRoute.value.path
    )
      return

    /** */

    const { path } = route as Route

    if (beforeEnter) {
      /**
       * @param from  Route from which we came
       * @param to    Route we are entering
       *
       * If we want the route to pass and continue, @return set to true. Otherwise false;
       */
      const canProceed = beforeEnter(activeRoute.value, route)
      if (!canProceed) return
    }

    const history = window.history
    history.pushState(null, '', path)

    /**
     * @param activeRoute Route from which we came
     * @param route       Route we are entering
     *
     * This hook is called when a new route was succesfuly entered. Providing the
     * user with information about both previous and current routes
     */
    if (onEnter) onEnter(activeRoute.value, route)
    activeRoute.value = route
  }

  window.addEventListener('popstate', (e) => {
    // console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    const path = window.location.pathname
    const route = getRoute({ by: 'path', value: path })

    activeRoute.value = route
  })

  // Set initial route
  const defRoute = routes.find((route) => route.default)
  if (defRoute) push(defRoute)
  else push({ path: '/' })

  //@ts-ignore
  window.router = {
    /**
     * Router Methods
     */
    push,
    getRoute,
    back,
    go,

    /**
     * Route data
     */
    activeRoute,
  }
}

//@ts-ignore
export const useRouter = () => window.router 
//@ts-ignore
export const useRoute = () => window.router.activeRoute.value 