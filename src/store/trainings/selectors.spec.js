import { createTraining, enrollEmployeeToTraining, clearParticipants, removeEmployeeFromTraining } from "./actions";
import { getTrainingSkillsInfo, getTrainingParticipantsInfo, getGeneralTrainingsInfo } from './selectors';
import { loadEmployees } from "../data";

import { initStoreWithActions, dataSet } from "../test-utils";

const noParticipants = {
  name: "#A No Participants",
  actions: [
    loadEmployees({ employees: dataSet.employees() }),
    createTraining({
      name: "From React & Redux to React Hooks",
      trainingSkills: ['react', 'redux', 'react-hooks'],
      level: "ADVANCED",
    }),
  ]
}

const someParticipantsEnrolled = {
  name: "#B Some Participants Enrolled",
  actions: [
    loadEmployees({ employees: dataSet.employees() }),
    createTraining({
      name: "From React & Redux to React Hooks",
      trainingSkills: ['react', 'redux', 'react-hooks'],
      level: "ADVANCED",
    }),
    enrollEmployeeToTraining({ employeeID: 51767706, trainingID: 1 }),
    enrollEmployeeToTraining({ employeeID: 64801242, trainingID: 1 }),
    enrollEmployeeToTraining({ employeeID: 528605, trainingID: 1 }),
    enrollEmployeeToTraining({ employeeID: 302356259, trainingID: 1 }),
    enrollEmployeeToTraining({ employeeID: 8184090, trainingID: 1 }),
  ]
}

const someParticipantsModified = {
  name: "#C Some Participants Modified",
  actions: [
    loadEmployees({ employees: dataSet.employees() }),
    createTraining({
      name: "From React & Redux to React Hooks",
      trainingSkills: ['react', 'redux', 'react-hooks'],
      level: "ADVANCED",
    }),
    createTraining({
      name: "Angular for AngularJS developers",
      trainingSkills: ['Angular', 'JavaScript', 'TypeScript', 'RxJS'],
      level: "BEGINNER",
    }),
    enrollEmployeeToTraining({ employeeID: 168575215, trainingID: 2 }),
    enrollEmployeeToTraining({ employeeID: 51767706, trainingID: 1 }),
    clearParticipants({ trainingID: 1 }),
    enrollEmployeeToTraining({ employeeID: 382582, trainingID: 2 }),
    enrollEmployeeToTraining({ employeeID: 1791071, trainingID: 1 }),
    enrollEmployeeToTraining({ employeeID: 528605, trainingID: 1 }),
    removeEmployeeFromTraining({ employeeID: 1791071, trainingID: 1 }),
  ]
}

describe('Trainings Selectors', () => {

  describe('getGeneralTrainingsInfo', () => {
    const testcases = [{
      ...noParticipants,
    }, {
      ...someParticipantsEnrolled,
    }, {
      ...someParticipantsModified,
    }];

    testcases.forEach(({ name, actions }) =>
      it(`should generate general training info for testcase:\n"${name}"`, () => {
        const store = initStoreWithActions(actions);

        const result = getGeneralTrainingsInfo(store.getState());
        expect(result).toMatchSnapshot();
      })
    );
  });

  describe('getTrainingParticipantsInfo', () => {
    const testcases = [{
      ...noParticipants,
      trainingID: 1,
    }, {
      ...someParticipantsEnrolled,
      trainingID: 1,
    }, {
      ...someParticipantsModified,
      trainingID: 1,
    }];

    testcases.forEach(({ name, actions, trainingID }) => {
      it(`should generate training participants info for testcase:\n"${name} (trainingID: ${trainingID})"`, () => {
        const store = initStoreWithActions(actions);

        const result = getTrainingParticipantsInfo(store.getState(), trainingID);
        expect(result).toMatchSnapshot();
      })
    });
  });

  describe('getTrainingSkillsInfo', () => {
    const testcases = [{
      ...noParticipants,
      trainingID: 1,
    }, {
      ...someParticipantsEnrolled,
      trainingID: 1,
    }, {
      ...someParticipantsModified,
      trainingID: 1,
    }];

    testcases.forEach(({ name, actions, trainingID }) => {
      it(`should generate skills info for testcase:\n"${name} (trainingID: ${trainingID})"`, () => {
        const store = initStoreWithActions(actions);

        const result = getTrainingSkillsInfo(store.getState(), trainingID);
        expect(result).toMatchSnapshot();
      })
    });
  });

});
