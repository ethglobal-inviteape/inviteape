import { useState, useEffect } from "react";
import Router from "next/router";

function Event({ event }) {
  return (
    <div
      className="w-full rounded-2xl bg-black pt-4 hover:cursor-pointer mb-4"
      onClick={() => {
        Router.push("/event/" + event.title);
      }}
    >
      <div className="text-white pb-4 pl-4 text-2xl">{event.title}</div>
      <div
        className="pl-4 pb-2"
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
            {event.attendees.length} Attendees
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
          {event.invitesAvailable.length} Invites Available
        </div>
      </div>
    </div>
  );
}

export default function Browse() {
  const dummyData = [
    {
      title: "Official BAYC Meet-up in NFT NYC !",
      motherERC721: "1234",
      childERC721: "1234",
      location: "Intrepid Sea, Air & Space Museum",
      date: "Thu, Apr 20, 08:00pm",
      attendees: [1, 2, 3],
      invitesAvailable: [1, 2],
    },
    // {
    //   title: "Hello Miami! (Armory Show After Hour Gathering)",
    //   motherERC721: "1234",
    //   childERC721: "1234",
    //   location: "Space Club Downtown Miami",
    //   date: "Thu, Apr 20, 08:00pm",
    //   attendees: [1],
    //   invitesAvailable: [1, 2, 3],
    // },
  ];
  const [events, setEvents] = useState(null);

  const fetchEvents = async () => {
    // try {
    //   const response = await fetch("/api/get");
    //   const events = await response.json();
    //   setEvents(events);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    setEvents(dummyData);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="text-gray-400 text-xl mt-16 mb-3">Events</div>
      {events &&
        events.map((event, index) => (
          <div key={event.title}>
            <Event event={event} />
          </div>
        ))}
    </div>
  );
}
