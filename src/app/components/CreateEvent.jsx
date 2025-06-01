"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [offset, setOffset] = useState(103540);
  const [selectedArtworks, setSelectedArtworks] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("https://eventdatabase.onrender.com/locations");
        const data = await res.json();
        setLocations(data);
        if (data.length > 0) setSelectedLocationId(data[0].id);
      } catch (err) {
        console.error("Kunne ikke hente locations:", err);
      }
    }
    fetchLocations();
    load();
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
        artworkIds: selectedArtworks,
        bookedTickets: [],
      };

      const res = await fetch("https://eventdatabase.onrender.com/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Noget gik galt");
      }

      alert("Event oprettet!");
      window.location.reload();
    } catch (err) {
      alert("Kunne ikke oprette event: " + err.message);
    }
  }

  function Select(artObjectNumber) {
    if (!selectedArtworks.includes(artObjectNumber)) {
      setSelectedArtworks([artObjectNumber, ...selectedArtworks]);
    } else {
      setSelectedArtworks(
        selectedArtworks.filter((id) => id !== artObjectNumber)
      );
    }
  }

  function load() {
    fetch(
      `https://api.smk.dk/api/v1/art/search/?keys=*&offset=${offset}&rows=50`
    )
      .then((res) => res.json())
      .then((data) => {
        const newArtworks = data.items || [];
        const unique = newArtworks.filter(
          (item) =>
            !artworks.some((a) => a.object_number === item.object_number)
        );
        setArtworks([...artworks, ...unique]);
        setOffset(offset + 50);
      });
  }

  const sortedArtworks = [
    ...selectedArtworks
      .map((objectNumber) =>
        artworks.find((a) => a.object_number === objectNumber)
      )
      .filter(Boolean),
    ...artworks.filter((a) => !selectedArtworks.includes(a.object_number)),
  ];

  return (
    <form
      className="relative flex flex-col shadow-md p-4 h-full bg-white"
      onSubmit={handleSubmit}
    >
      <button
        className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
        onClick={onCancel}
        type="button"
        aria-label="Luk"
      >
        X
      </button>

      {/* Titel */}
      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2 mt-16">
        <label
          className="font-bold pl-4"
          htmlFor="title"
        >
          Titel:
        </label>
        <input
          className="bg-gray-300 sm:ml-4 p-4 text-white w-full sm:w-1/2"
          placeholder="Event navn"
          type="text"
          id="title"
          value={eventInfo.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Kurator */}
      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4"
          htmlFor="curator"
        >
          Kurator:
        </label>
        <input
          className="bg-gray-300 sm:ml-4 p-4 text-white w-full sm:w-1/2"
          type="text"
          id="curator"
          placeholder="Kuratorens Navn"
          value={eventInfo.curator}
          onChange={(e) => handleChange("curator", e.target.value)}
        />
      </div>

      {/* Dato */}
      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4"
          htmlFor="date"
        >
          Dato:
        </label>
        <input
          className="bg-gray-300 sm:ml-4 p-4 text-white w-full sm:w-1/2"
          type="date"
          id="date"
          value={eventInfo.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      {/* Lokation vælger */}
      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4"
          htmlFor="location"
        >
          Lokation:
        </label>
        <select
          id="location"
          className="bg-gray-300 text-white sm:ml-4 p-4 w-full sm:w-1/2"
          value={selectedLocationId}
          onChange={(e) => setSelectedLocationId(e.target.value)}
        >
          {locations.map((loc) => (
            <option
              key={loc.id}
              value={loc.id}
            >
              {loc.name} – {loc.address}
            </option>
          ))}
        </select>
      </div>

      {/* Beskrivelse */}
      <div className="my-4 shadow-md text-xl flex flex-col h-[200px]">
        <label
          className="font-bold mb-2 mx-4 py-2"
          htmlFor="description"
        >
          Beskrivelse:
        </label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 h-full resize-none"
          id="description"
          value={eventInfo.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Søgefelt */}
      <div className="mb-4 mt-8 flex justify-center">
        <input
          type="text"
          placeholder="Søg efter titel, kunstner eller objekt nummer..."
          className="sm:w-1/2 p-2 border border-gray-400 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Vælg kunstværker */}
      <h2 className="font-bold text-left pl-4 text-xl my-4">
        Vælg kunstværker til event:
      </h2>
      <div className="my-6 mx-2 p-5 h-[600px] overflow-y-auto">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:p-2">
          {sortedArtworks
            .filter((art) => {
              if (!art?.has_image) return false;
              const search = searchTerm.toLowerCase();
              return (
                art.object_number?.toLowerCase().includes(search) ||
                art.titles?.some((t) =>
                  t.title?.toLowerCase().includes(search)
                ) ||
                art.creators?.some((c) =>
                  c.name?.toLowerCase().includes(search)
                )
              );
            })
            .map((art, index) => {
              const imgSrc =
                art.image_thumbnail ||
                art.image?.thumbnail ||
                art.image?.web ||
                art.images?.[0]?.web;
              return (
                <li
                  key={`${art.object_number}-${index}`}
                  onClick={() => Select(art.object_number)}
                  className={`shadow-xl/20 rounded-md p-4 bg-white hover:bg-gray-200 ease-in duration-100 ${
                    selectedArtworks.includes(art.object_number)
                      ? "border-2 border-red-600"
                      : ""
                  }`}
                >
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={art.titles?.[0]?.title || "Artwork"}
                      title={`Object Number: ${art.object_number}`}
                      className="mt-2 w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="mt-2 text-gray-500">No image available</div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>

      {/* Indlæs flere */}
      <button
        type="button"
        onClick={load}
        className="text-[#800000] border-2 border-[#800000] py-2 px-4 mb-10 mt-5 mx-auto hover:bg-[#800000] hover:text-white"
      >
        Indlæs flere
      </button>

      {/* Knapper */}
      <div className="flex justify-center p-4 gap-20">
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#800000] text-white lg:text-2xl xl:text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 hover:text-[#800000] hover:border-[#800000] hover:border hover:bg-white cursor-pointer"
        >
          Slet Event
        </button>
        <button
          type="submit"
          className="lg:text-2xl xl:text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer"
        >
          Opret Event
        </button>
      </div>
    </form>
  );
}
