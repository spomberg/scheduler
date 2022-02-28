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

module.exports = { getAppointmentsForDay, getInterview };