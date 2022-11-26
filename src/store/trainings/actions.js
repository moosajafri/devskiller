export const CREATE_TRAINING = "CREATE_TRAINING"
export const UPDATE_TRAINING = "UPDATE_TRAINING"
export const CLEAR_PARTICIPANTS = "CLEAR_PARTICIPANTS"
export const ENROLL_EMPLOYEE_TO_TRAINING = "ENROLL_EMPLOYEE_TO_TRAINING"
export const REMOVE_EMPLOYEE_FROM_TRAINING = "REMOVE_EMPLOYEE_FROM_TRAINING"

export const createTraining = ({ name, trainingSkills, level }) => ({
  type: CREATE_TRAINING,
  name, trainingSkills, level
})

export const updateTraining = ({ id, name, trainingSkills, level }) => ({
  type: UPDATE_TRAINING,
  id, name, trainingSkills, level
})

export const clearParticipants = ({ trainingID }) => ({
  type: CLEAR_PARTICIPANTS,
  trainingID,
})

export const enrollEmployeeToTraining = ({ employeeID, trainingID }) => ({
  type: ENROLL_EMPLOYEE_TO_TRAINING,
  employeeID,
  trainingID
})

export const removeEmployeeFromTraining = ({ employeeID, trainingID }) => ({
  type: REMOVE_EMPLOYEE_FROM_TRAINING,
  employeeID,
  trainingID
})

export const actions = {
  createTraining,
  updateTraining,
  clearParticipants,
  enrollEmployeeToTraining,
  removeEmployeeFromTraining,
}
