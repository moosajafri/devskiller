import produce from "immer";

import { actions } from './actions';

const initialState = {
  trainings: {},
}

export const trainingReducer = (state = initialState, action) => {
  switch(action.type){
    case "CREATE_TRAINING": {
      const newID = Object.values(state.trainings).length + 1
      const { type, ...trainingData } = action
      return {
        ...state, 
        trainings: {
          ...state.trainings,
          [newID]: {
            id: newID,
            ...trainingData,
            employees: [],
          }
        }
      }
    }
          
    case "UPDATE_TRAINING": {
      const { type, id, name, trainingSkills, level } = action
      return {
        ...state,
        trainings: {
          ...state.trainings,
          [id]: {
            ...state.trainings[id],
            ...(name && { name }),
            ...(trainingSkills && { trainingSkills }),
            ...(level && { level }),
            }
        }
      }
    }
          
    case "CLEAR_PARTICIPANTS":
      return {
        ...state,
        trainings: {
          ...state.trainings,
          [action.trainingID]: {
            ...state.trainings[action.trainingID],
            employees: [],
          }
        }
      }

    case "ENROLL_EMPLOYEE_TO_TRAINING":
      return {
        ...state,
        trainings: {
          ...state.trainings,
          [action.trainingID]: {
            ...state.trainings[action.trainingID],
            employees: [...state.trainings[action.trainingID].employees, action.employeeID],
          }
        }
      }
          
    case "REMOVE_EMPLOYEE_FROM_TRAINING":
      return {
        ...state,
        trainings: {
          ...state.trainings,
          [action.trainingID]: {
            ...state.trainings[action.trainingID],
            employees: state.trainings[action.trainingID].employees
              .filter(employeeID => employeeID !== action.employeeID),
          }
        }
      }

    default:
      return state
  }
}
