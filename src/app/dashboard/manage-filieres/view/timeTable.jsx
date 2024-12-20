import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizer for React Big Calendar
const localizer = momentLocalizer(moment);

// Mapping French days to English
const dayMapping = {
  LUNDI: "Monday",
  MARDI: "Tuesday",
  MERCREDI: "Wednesday",
  JEUDI: "Thursday",
  VENDREDI: "Friday",
  SAMEDI: "Saturday",
};

// Mapping seance to time slots
const seanceTimeMapping = {
  SEANCE_1: { start: "08:00", end: "10:00" },
  SEANCE_2: { start: "10:00", end: "12:00" },
  SEANCE_3: { start: "14:00", end: "16:00" },
  SEANCE_4: { start: "16:00", end: "18:00" },
};

// Custom Event Component
const CustomEvent = ({ event }) => {
  return (
    <div style={{ padding: "5px" }}>
      <strong className="text-2xl font-bold">
        {event.title.split(" - ")[0]}
      </strong>
      <br />
      <span className="text-md font-light">
        {event.title.split(" - ")[1]}
      </span>{" "}
      -
      <span className="text-md font-light"> {event.title.split(" - ")[2]}</span>
      <br />
      <span className="text-sm font-light"> {event.title.split(" - ")[3]}</span>
    </div>
  );
};

const Timetable = ({ data }) => {
  // Create events for the calendar based on the data
  const events = data?.map((item) => ({
    title: `${item.chargeHoraire?.matiere?.name} - ${item.typeSeance} - ${item.salle?.name} - ${item.user?.username} `,
    start: moment()
      .day(dayMapping[item.jour]) // Use the mapped English day
      .set({
        hour: seanceTimeMapping[item.seance].start.split(":")[0],
        minute: seanceTimeMapping[item.seance].start.split(":")[1],
      })
      .toDate(),
    end: moment()
      .day(dayMapping[item.jour]) // Use the mapped English day
      .set({
        hour: seanceTimeMapping[item.seance].end.split(":")[0],
        minute: seanceTimeMapping[item.seance].end.split(":")[1],
      })
      .toDate(),
  }));

  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        step={60}
        timeslots={1}
        style={{ height: "75vh" }}
        className="bg-white shadow-sm"
        dayLayoutAlgorithm={"no-overlap"}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.title.includes("COURS")
              ? "#edbe00"
              : event.title.includes("TD")
              ? "#0caeff"
              : "#ff6666",
            color: "white",
          },
        })}
        formats={{
          dayFormat: "dddd",
          timeGutterFormat: "HH:mm",
        }}
        min={new Date(moment().set({ hour: 8, minute: 0, second: 0 }).toDate())}
        max={
          new Date(moment().set({ hour: 18, minute: 0, second: 0 }).toDate())
        }
        components={{
          toolbar: () => <div className="hidden"></div>,
          event: CustomEvent, // Use the custom event component
        }}
        minTime={moment("08:00", "HH:mm").toDate()}
        maxTime={moment("18:00", "HH:mm").toDate()}
        showMultiDayTimes={true}
        dayPropGetter={(date) => {
          const dayOfWeek = moment(date).day();
          if (dayOfWeek === 0) {
            return { style: { display: "none" } };
          }
          return {};
        }}
      />
    </div>
  );
};

export default Timetable;
