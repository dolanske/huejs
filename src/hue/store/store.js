import { reactive } from '../reactive.js'

/**
 * Global store variable, the single source of truth
 * for all components and scripts (if needed)
 */

let store = {}

export const createStore = (data) => {
  const { id, state, actors, getters } = data

  store[id] = {
    state: reactive({ ...state }),
    // actors,
    // getters,
  }
}

export const useStore = (id) => store[id] ?? {}
