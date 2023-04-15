import { useState, useEffect } from "react";
import Router from "next/router";

function Event({ event }) {
  return (
    <div
      className="w-96 rounded-2xl bg-black pt-4 hover:cursor-pointer"
      onClick={() => {
        Router.push("/event/" + event.title);
      }}
    >
      <div className="text-white pb-2 pl-4 text-3xl">{event.title}</div>
      <div
        className="pl-4"
        style={{
          color: "#00ff00",
        }}
      >
        {event.date}
      </div>
      <div className="text-white pl-4 pb-5">@ {event.location}</div>
      <div className="flex ">
        <div
          className="flex-1 py-2"
          style={{
            background: "#111914",
            "border-bottom-left-radius": "16px",
          }}
        >
          <div
            className="text-center"
            style={{
              color: "#00ff00",
            }}
          >
            12 Attendees
          </div>
        </div>
        <div
          className="flex-1 text-center py-2"
          style={{
            background: "#23190d",
            "border-bottom-right-radius": "16px",
            color: "#ffc400",
          }}
        >
          4 Invites Available
        </div>
      </div>
    </div>
  );
}

export default function Browse() {
  const [events, setEvents] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/get");
      const events = await response.json();

      setEvents(events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="text-gray-400 text-xl mb-2">Events</div>
      {events &&
        events.map((event, index) => (
          <div key={event.title}>
            <Event event={event} />
          </div>
        ))}
    </div>
  );
}
