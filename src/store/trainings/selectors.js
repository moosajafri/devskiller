export const getGeneralTrainingsInfo = (state) => {
  // implementation here
  const copy = { ...state.trainings.trainings };
  return Object.entries(copy)
    .map((x) => {
      return {
        id: Number(x[0]),
        name: x[1]["name"],
        level: x[1]["level"],
        participants: x[1]["employees"].length,
      };
    })
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
};

export const getTrainingParticipantsInfo = (state, trainingID) => {
  // implementation here
  const copy = { ...state.trainings.trainings[trainingID] };
  const allEmployees = [...state.data.employees];
  const participants = allEmployees
    .filter((person) => copy.employees.includes(person.id))
    .sort((a, b) => {
      const nameA = a.lastName.toUpperCase();
      const nameB = b.lastName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    .map((x) => {
      return {
        id: x.id,
        name: `${x.firstName} ${x.lastName}`,
        position: x.position,
      };
    });
  return participants;
};

export const getTrainingSkillsInfo = (state, trainingID) => {
  // implementation here
  const stateCopy = JSON.parse(JSON.stringify(state));
  const copy = { ...stateCopy.trainings.trainings[trainingID] };

  const allEmployees = [...stateCopy.data.employees];
  const trainingEmployees = allEmployees.filter((person) =>
    copy.employees.includes(person.id)
  );

  const returnValue = copy.trainingSkills.reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        // have: state.data.employees.some((emp) =>
        //   emp.skills.includes.includes(r)
        // ),
        have: trainingEmployees.filter((employee) => {
          return employee.skills.includes(key);
        }).length,
        "not-have":
          trainingEmployees.length -
          trainingEmployees.filter((employee) => {
            return employee.skills.includes(key);
          }).length,
      },
    }),
    {}
  );

  return returnValue;
};
