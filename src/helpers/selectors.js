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

module.exports = { getAppointmentsForDay };