import React, { useEffect } from "react";
import { useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {Object.values(dailyAppointments).map(appointment => {
          const interview = getInterview(state, appointment.interview);

         return( 
            <Appointment 
            key={appointment.id} 
            {...appointment}
            interview={interview}
            interviewers={interviewers}
            />
         )
        })}
        <Appointment key={"last"} time={"5pm"}/>
      </section>
    </main>
  );
}
