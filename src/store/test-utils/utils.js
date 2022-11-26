import { getStore } from "../store";

export const initStoreWithActions = (actions) => {
  const store = getStore()
  for (const action of actions){
    store.dispatch(action)
  }
  return store
}
