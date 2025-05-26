"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateEvent({ onCancel }) {
  const [eventInfo, setEventInfo] = useState({
    id: uuidv4(),
    title: "",
    curator: "",
    date: "",
    location: "",
    description: "",
  });

    function handleTitleChange(e) {
    setEventInfo((prev) => ({ ...prev, title: e.target.value }));
  }
  function handleCuratorChange(e) {
    setEventInfo((prev) => ({ ...prev, curator: e.target.value }));
  }
  function handleDateChange(e) {
    setEventInfo((prev) => ({ ...prev, date: e.target.value }));
  }
  function handleLocationNameChange(e) {
    setEventInfo((prev) => ({ ...prev, description: e.target.value }));
  }
  function handleLocationAddressChange(e) {
    setEventInfo((prev) => ({ ...prev, description: e.target.value }));
  }
  function handleDescriptionChange(e) {
    setEventInfo((prev) => ({ ...prev, description: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/events", {
        method: "POST",
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
    <form className="flex flex-col shadow-md p-4 h-full bg-white" onSubmit={handleSubmit}>
      {/* Input fields ... */}
        <div className="flex items-center justify-between shadow-md text-xl my-2 h-full">
        <label className="font-bold pl-4 bg-white" htmlFor="titel">Titel:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          placeholder="Event navn"
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
          placeholder="Kuratorens Navn"
          value={eventInfo.curator}
          onChange={handleCuratorChange}
        />
      </div>
        <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="dato">Dato:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          placeholder="DD/MM/ÅÅÅÅ"
          type="text"
          id="dato"
          value={eventInfo.date}
          onChange={handleDateChange}
        />
      </div>
       <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="location">Lokation:</label>
        <div className="flex justify-end w-1/2">
          <input
          className="bg-gray-300 p-4 h-full text-white w-1/2"
          type="text"
          id="navn"
          placeholder="Hallens Navn"
          value={eventInfo.location.name}
          onChange={handleLocationNameChange}
        />
          <input
          className="bg-gray-300 ml-2 p-4 h-full text-white w-full"
          type="text"
          id="adresse"
          placeholder="Adresse"
          value={eventInfo.location.address}
          onChange={handleLocationAddressChange}
        />
        </div>
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
