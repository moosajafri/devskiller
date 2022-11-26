import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { dataReducer } from './data'
import { trainingReducer } from './trainings'

export const rootReducer = combineReducers({
  data: dataReducer,
  trainings: trainingReducer,
})

export const getStore = () => {
  return createStore(rootReducer, composeWithDevTools({
    name: "Redux-HR-Department",
  }))
}
