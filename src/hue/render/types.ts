export interface Node {
  tag: string,
  props: string | object | undefined | Array<string | object> ,
  children: Array<string | object> | undefined | string
}