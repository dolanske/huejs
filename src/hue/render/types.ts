export interface Node {
  tag: string,
  props: string | object | undefined,
  children: Array<string | object> | undefined | string
}

export interface Lifecycle {
  onInit: void,
  onCreated: void,
  onUpdated: void,
  beforeDestroy: void
}