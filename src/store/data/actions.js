export const LOAD_EMPLOYEES = "LOAD_EMPLOYEES"
export const LOAD_PROJECTS = "LOAD_PROJECTS"

export const loadEmployees = ({ employees }) => ({
  type: LOAD_EMPLOYEES,
  employees,
})

export const loadProjects = ({ projects }) => ({
  type: LOAD_PROJECTS,
  projects,
})

export const actions = {
  loadEmployees,
  loadProjects,
}
