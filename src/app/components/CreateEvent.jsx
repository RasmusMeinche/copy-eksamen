"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateEvent({ onCancel }) {
  const [eventInfo, setEventInfo] = useState({
    id: uuidv4(),
    title: "",
    curator: "",
    date: "",
    location: { name: "", address: "" },
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "location") {
      const [nameVal, addressVal] = value.split(" - ");
      setEventInfo((prev) => ({
        ...prev,
        location: { name: nameVal, address: addressVal },
      }));
    } else {
      setEventInfo((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventInfo),
      });

      if (!res.ok) throw new Error("Noget gik galt");
      alert("Event oprettet!");
      onCancel();
    } catch (err) {
      alert("Kunne ikke oprette event: " + err.message);
    }
  }

  return (
    <form className="flex flex-col shadow-md p-4 h-full" onSubmit={handleSubmit}>
      {/* Input fields ... */}
      <div className="my-4 shadow-md text-xl flex flex-col h-[200px]">
        <label className="font-bold mb-2 mx-4 py-2" htmlFor="beskrivelse">Beskrivelse:</label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 h-full resize-none"
          id="beskrivelse"
          name="description"
          value={eventInfo.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center p-4 gap-20">
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#800000] text-white text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 hover:text-[#800000] hover:border-[#800000] hover:border hover:bg-white cursor-pointer"
        >
          Annuller
        </button>
        <button
          type="submit"
          className="text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer"
        >
          Opret Event
        </button>
      </div>
    </form>
  );
}
