"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateEvent({ onCancel }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");

  const [eventInfo, setEventInfo] = useState({
    id: uuidv4(),
    title: "",
    curator: "",
    date: "",
    description: "",
    totalTickets: 50,
    artworkIds: [],
  });

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("http://localhost:8080/locations");
        const data = await res.json();
        setLocations(data);
        if (data.length > 0) setSelectedLocationId(data[0].id);
      } catch (err) {
        console.error("Kunne ikke hente locations:", err);
      }
    }
    fetchLocations();
  }, []);

  function handleChange(field, value) {
    setEventInfo((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        ...eventInfo,
        locationId: selectedLocationId,
        bookedTickets: [],
      };

      const res = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Noget gik galt");
      }

      alert("Event oprettet!");
      window.location.reload(); // ← Her opdateres siden automatisk

    } catch (err) {
      alert("Kunne ikke oprette event: " + err.message);
    }
  }

  return (
    <form
      className="flex flex-col shadow-md p-4 h-full bg-white"
      onSubmit={handleSubmit}
    >
      {/* Titel */}
      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4" htmlFor="title">
          Titel:
        </label>
        <input
          className="bg-gray-300 ml-4 p-4 text-white w-1/2"
          placeholder="Event navn"
          type="text"
          id="title"
          value={eventInfo.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Kurator */}
      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4" htmlFor="curator">
          Kurator:
        </label>
        <input
          className="bg-gray-300 ml-4 p-4 text-white w-1/2"
          type="text"
          id="curator"
          placeholder="Kuratorens Navn"
          value={eventInfo.curator}
          onChange={(e) => handleChange("curator", e.target.value)}
        />
      </div>

      {/* Dato */}
      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4" htmlFor="date">
          Dato:
        </label>
        <input
          className="bg-gray-300 ml-4 p-4 text-white w-1/2"
          type="date"
          id="date"
          value={eventInfo.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      {/* Lokation vælger */}
      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4" htmlFor="location">
          Lokation:
        </label>
        <select
          id="location"
          className="bg-gray-300 text-white ml-4 p-4 w-1/2"
          value={selectedLocationId}
          onChange={(e) => setSelectedLocationId(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} – {loc.address}
            </option>
          ))}
        </select>
      </div>

      {/* Beskrivelse */}
      <div className="my-4 shadow-md text-xl flex flex-col h-[200px]">
        <label className="font-bold mb-2 mx-4 py-2" htmlFor="description">
          Beskrivelse:
        </label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 h-full resize-none"
          id="description"
          value={eventInfo.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Knapper */}
      <div className="flex justify-center p-4 gap-20">
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#800000] text-white text-3xl w-1/4 h-[60px] px-2 py-1.5 hover:bg-white hover:text-[#800000] hover:border-[#800000] hover:border cursor-pointer"
        >
          Annuller
        </button>
        <button
          type="submit"
          className="text-3xl w-1/4 h-[60px] px-2 py-1.5 border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer"
        >
          Opret Event
        </button>
      </div>
    </form>
  );
}
