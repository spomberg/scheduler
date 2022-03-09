import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  function updateSpots(id, appointments) {
    const dayID = Math.ceil(id / 5) - 1;
    const day = state.days[dayID];
    let availableSpots = 0;

    day.appointments.forEach(appointment => {
      if (!appointments[appointment].interview) {
        availableSpots++
      }
    })

    const updatedDay = {
      ...day,
      spots: availableSpots
    }

    const updatedDays =  [...state.days];

    updatedDays[dayID] = updatedDay;

    setState(prev => ({
      ...prev,
      days: updatedDays
    }))
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.resolve(axios.put(`/api/appointments/${id}`, appointment))
    .then(() => {
      setState(prev => ({
        ...prev,
        appointments
      }))
    })
    .then(() => updateSpots(id, appointments))
    .catch(err => console.log(err));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return Promise.resolve(axios.delete(`/api/appointments/${id}`))
    .then(() => {
      setState(prev => ({
        ...prev,
        appointments
      }))
    })
    .then(() => updateSpots(id, appointments))
    .catch(err => console.log(err));
  }

  return { state, setDay, bookInterview, cancelInterview }
}

