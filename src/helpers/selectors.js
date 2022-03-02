function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.filter(element => element.name === day);

  if (filteredDay.length === 0 ) {
    return [];
  }

  const filteredAppointments = filteredDay[0].appointments;
  
  const appointmentsArr = filteredAppointments.map(appointment => state.appointments[appointment])

  return appointmentsArr;
}

function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.filter(element => element.name === day);

  if (filteredDay.length === 0 ) {
    return [];
  }

  const filteredInterviewers = filteredDay[0].interviewers;
  
  const interviewersArr = filteredInterviewers.map(interviewer => state.interviewers[interviewer])

  return interviewersArr;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const output = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return output;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };