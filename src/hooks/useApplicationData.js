import { useState } from "react"
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }));

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
      setState({
        ...state,
        appointments
      });
    })
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
      setState({
        ...state,
        appointments
      })
    })
  }

  return { state, setState, setDay, bookInterview, cancelInterview }
}

