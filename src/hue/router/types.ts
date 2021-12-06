export interface Route {
  path?: string,
  container?: object | Function,
  name?: string,
  props?: object,
  title?: string,
  redirect?: string,
  default?: boolean,
  query?: string,
}

export interface Router {
  routes: Array<Route>,
  beforeEnter(from: Route, to: Route): Function,
  onEnter(from: Route, to: Route): Function,
}