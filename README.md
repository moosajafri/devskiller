This task evaluates the candidate's skills in `Redux`.

# Redux JavaScript Selectors - HR Department Trainings

Implement missing Redux funcionality for the HR Department application.

## Setup

Follow these steps for correct application setup:

1. `npm install` – install dependencies
2. `npm test` – run all tests once (this will be used to evaluate your progress)
3. `npm run test:watch` – run all tests in watch mode (you can use it on your local machine for convenience)

## The subject of tests

- this task checks whether redux selectors are implemented correctly
- the results are checked against standard assertions and snapshot tests (read more about [snapshot testing in `jest`](https://jestjs.io/docs/en/snapshot-testing))
- **you can't modify snapshot tests**, these files are read-only
- if anything by all means is not clear within this *readme*, **please refer to the tests and make them pass**

## Tips

- you can use the `immer` package if you want (but don't have to). It's already loaded in `package.json`
- **you can assume that IDs are consistent across state**. This means, if a _project_ has ID which references an employee with this ID, you can assume it exists and there's no need to handle errors due to this object missing. Example: if there are 2 drafts (id:1, id:2) tests won't try to add an change that relates to draft id:3, no need to check for that.
- IDs of _trainings_ and are integers counted from 1, auto-increment (1, 2, 3, ...)

## Your Task

### Model

The exercise below implements a HR Department management platform:
- there are `Employee` objects, representing employees within the company
  - employees data can be found in `src/store/test-utils/employees.json` file
  - Example employee:
  ```json
  {
    "id": 302356259,
    "salary": 9577,
    "firstName": "Jackson",
    "lastName": "Murray",
    "skills": [
      "technical support",
      "customer support"
    ],
    "contract": "permanent",
    "position": "Software Engineer"
  }
  ```
- there are also `Project` objects. _Employees_ are working in _Projects_
  - projects data can be found in `src/store/test-utils/projects.json` file
  - technically, a _Project_ has id references to _Employees_ represented by their IDs, e.g. in following example project:
  ```json
  {
    "id": "df3f32b4-112e-4f79-bd62-63cc09151369",
    "name": "Gorgeous Rubber Fish",
    "budget": 3605000,
    "team": [
      {
        "id": 8184090,
        "name": "Maëlys Roy"
      },
      {
        "id": 51767706,
        "name": "Chance Johns"
      },
      {
        "id": 1791071,
        "name": "Sophie Klein"
      }
    ],
    "manager": 9928851
  }
  ```
  the project team includes 3 employees and one manager. Each id is a reference to en `Employee` with given ID, for instance the project manager can be found:
  ```json
  {
    "id": 9928851,
    "salary": 9213,
    "firstName": "Teseo",
    "lastName": "Martini",
    ...
  }
  ```
  and the first team member:
  ```json
  {
    "id": 8184090,
    "salary": 3288,
    "firstName": "Maëlys",
    "lastName": "Roy",
    ...
  }
  ```

The Model is ready for you to work with, there's no need to change it. Both `employees` and `projects` will be available in redux store whenever they're needed.

### Redux

Following reducers are included in redux setup:
- `dataReducer` - handles loading `Employee` objects and `Project` objects, this reducer is already implemented
- `trainingReducer` - this reducer should allow planning developer trainings, defining what skills are being taught, enrolling participants to trainings, removing them, and, finally, approving the trainings. **This reducer is _already implemented_. This reducer and the selectors you will write all relate to the same data**.
  - `CREATE_TRAINING` - creates a training with general information (`name`, `trainingSkills`, `level`) and empty participants list.
  **Accepts**: `name`, `trainingSkills`, `level`
  - `UPDATE_TRAINING` - updates information about the training (identified by `id`). The information to update are the same that are accepted by `CREATE_TRAINING` above
  **Accepts**: `name`, `trainingSkills`, `level` *and* `id`
  - `CLEAR_PARTICIPANTS` - removes all participants previously enrolled to a training.
  **Accepts**: `trainingID`
  - `ENROLL_EMPLOYEE_TO_TRAINING` - enrolls a participant to a training.
  **Accepts**: `trainingID`, `employeeID`
  - `REMOVE_EMPLOYEE_FROM_TRAINING` - removes a participant from a training.
  **Accepts**: `trainingID`, `employeeID`

### Selectors

Following selectors need to be implemented for *trainings*:
  - `getGeneralTrainingsInfo`: list all trainings with their details (`id`, `name`, `level`, and number of `participants`). Training should be sorted by `name` property in ascending order.
  **Example result**:
  ```json
  [
    {
      "id": 2,
      "name": "Angular for AngularJS developers",
      "level": "BEGINNER",
      "participants": 2,
    },
    {
      "id": 1,
      "name": "From React & Redux to React Hooks",
      "level": "ADVANCED",
      "participants": 1,
    },
  ]
  ```
  - `getTrainingParticipantsInfo`: list all participants with their information (`id`, `name` and `position`) for a given training. Participants should be sorted by `lastName` property in ascending order).
  **Example result**:
  ```json
  [
    {
      "id": 168575215,
      "name": "Berta Negrete",
      "position": "Junior Cloud Developer",
    },
    {
      "id": 382582,
      "name": "Fatima Rossetti",
      "position": ".Net Engineer",
    },
  ]
  ```
  - `getTrainingSkillsInfo`: determine how many participants already have a skill that is being taught at a given training. Specify all the skills trained and for each oof them, specify how many participants already have that skill (`have` key) and how many don't (`not-have` key)
  **Example result:**
  ```json
  {
    "react": {
      "have": 3,
      "not-have": 2,
    },
    "react-hooks": {
      "have": 0,
      "not-have": 5,
    },
    "redux": {
      "have": 1,
      "not-have": 4,
    },
  }
  ```
  In above example a training will teach 3 skills. As for `react` skill, 3 employees already know it, 2 don't know it yet.

## Good Luck!
