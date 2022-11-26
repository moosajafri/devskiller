import produce from "immer";

import { actions } from './actions';

const initialState = {
  employees: [],
  projects: [],
}

export const dataReducer = (state = initialState, action) => {
  switch(action.type){
    case "LOAD_EMPLOYEES":
      return {
        ...state,
        employees: action.employees,
      }

    case "LOAD_PROJECTS":
      return {
        ...state,
        projects: action.projects,
      }

    default:
      return state
  }
}
