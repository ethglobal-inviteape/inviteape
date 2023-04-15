import { useState, useEffect } from "react";
import Router from "next/router";

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
      {events &&
        events.map((event, index) => (
          <div
            onClick={() => {
              Router.push("/event/" + event.title);
            }}
            key={event.title}
          >
            <div>{event.title}</div>
            <div>{event.childERC721}</div>
            <div>{event.motherERC721}</div>
          </div>
        ))}
    </div>
  );
}
