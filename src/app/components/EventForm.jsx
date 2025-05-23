"use client";

import { useState } from "react";

export default function EventForm({ event }) {
  const [eventInfo, setEventInfo] = useState({
    title: event.title,
    curator: event.curator,
    date: event.date,
    description: event.description,
  });

  // Input change handlers
  function handleTitleChange(e) {
    setEventInfo((prev) => ({ ...prev, title: e.target.value }));
  }
  function handleCuratorChange(e) {
    setEventInfo((prev) => ({ ...prev, curator: e.target.value }));
  }
  function handleDateChange(e) {
    setEventInfo((prev) => ({ ...prev, date: e.target.value }));
  }
  function handleDescriptionChange(e) {
    setEventInfo((prev) => ({ ...prev, description: e.target.value }));
  }

  // Handle PATCH request
  async function handleUpdate(e) {
    e.preventDefault(); // prevent page reload
    try {
      const response = await fetch(`http://localhost:8080/events/${event.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();
      alert("Event opdateret!");
      console.log("Updated event:", updatedEvent);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Noget gik galt under opdateringen.");
    }
  }

  return (
    <form className="flex flex-col shadow-md p-4 h-full" onSubmit={handleUpdate}>
      {/* Input fields, unchanged */}
      <div className="flex items-center justify-between shadow-md text-xl my-2 h-full">
        <label className="font-bold pl-4 bg-white" htmlFor="titel">Titel:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          type="text"
          id="titel"
          value={eventInfo.title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="kurator">Kurator:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          type="text"
          id="kurator"
          value={eventInfo.curator}
          onChange={handleCuratorChange}
        />
      </div>

      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="dato">Dato:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          type="text"
          id="dato"
          value={eventInfo.date}
          onChange={handleDateChange}
        />
      </div>

      <div className="my-4 shadow-md text-xl flex flex-col h-[200px]">
        <label className="font-bold mb-2 mx-4 py-2" htmlFor="beskrivelse">Beskrivelse:</label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 h-full resize-none"
          id="beskrivelse"
          value={eventInfo.description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="flex justify-center p-4 gap-20">
        <button
          type="button"
          className="bg-[#800000] text-white text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 hover:text-[#800000]  hover:border-[#800000] hover:border hover:bg-white cursor-pointer"
        >
          Slet Event
        </button>
        <button
          type="submit"
          className="text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 border border-[#800000] text-[#800000]  hover:bg-[#800000] hover:text-white cursor-pointer"
        >
          Opret Event
        </button>
      </div>
    </form>
  );
}
