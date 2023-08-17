// store.ts
import { createStore } from 'redux'

const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    default:
      return state
  }
}

export const store = createStore(reducer)
