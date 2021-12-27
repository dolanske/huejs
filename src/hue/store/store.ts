import { reactive } from '../reactive.js'
import {Store} from "./types.js"

/**
 * Global store variable, the single source of truth
 * for all components and scripts (if needed)
 */

let globalStoreObject = {}

export const createStore = (id: string, data: Store) => {
  globalStoreObject = {
    ...globalStoreObject,
    [id]: data as Store
  }
}

// export const useStore = (id) => store[id] ?? {}
