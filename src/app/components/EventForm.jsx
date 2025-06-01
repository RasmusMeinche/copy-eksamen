"use client";

import { useState, useEffect } from "react";

export default function EventForm({ event, onCancel }) {
  const [eventInfo, setEventInfo] = useState({
    title: event.title,
    curator: event.curator,
    date: event.date,
    location: event.location,
    description: event.description,
    artworkIds: [],
  });

  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");

  const [artworks, setArtworks] = useState([]);
  const [offset, setOffset] = useState(51540); // Begynd med at hente fra offset 51540, fordi her er billederne farverige og flotte
  const [selectedArtworks, setSelectedArtworks] = useState(
    event.artworkIds || []
  );
  const [searchTerm, setSearchTerm] = useState("");

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

  // Alt om billeder herinde
  function load() {
    fetch(
      `https://api.smk.dk/api/v1/art/search/?keys=*&offset=${offset}&rows=50`
    )
      .then((res) => res.json())
      .then((data) => {
        const newArtworks = data.items || [];
        setArtworks((prev) => [...prev, ...newArtworks]);
        setOffset((prev) => prev + 50);
      });
  }

  useEffect(() => {
    load();

    // Loader valgte kunstværker, hvis de ikke allerede er hentet (i de 50 der bliver fetch'et)
    async function preloadSelectedArtworks() {
      if (!event.artworkIds || event.artworkIds.length === 0) return;

      const missingIds = event.artworkIds.filter(
        (id) => !artworks.some((a) => a.object_number === id)
      );

      const fetchedArtworks = await Promise.all(
        missingIds.map(fetchArtworkById)
      );
      setArtworks((prev) => [...fetchedArtworks, ...prev]);
      setSelectedArtworks(event.artworkIds);
    }

    preloadSelectedArtworks();
  }, []);

  // Fetcher for at hente kunstværker baseret på ID, hvis de ikke allerede er fetchet
  async function fetchArtworkById(id) {
    const res = await fetch(`https://api.smk.dk/api/v1/art/search/?keys=${id}`);
    const data = await res.json();
    return data.items?.[0] || null;
  }

  // Rykker valgte kunstværker til toppen af listen
  function Select(artObjectNumber) {
    if (!selectedArtworks.includes(artObjectNumber)) {
      setSelectedArtworks([artObjectNumber, ...selectedArtworks]);
    } else {
      setSelectedArtworks(
        selectedArtworks.filter((id) => id !== artObjectNumber)
      );
    }
  }

  // Sorterer kunstværkerne, så de valgte kommer først
  const sortedArtworks = [
    ...selectedArtworks
      .map((objectNumber) =>
        artworks.find((a) => a.object_number === objectNumber)
      )
      .filter(Boolean),
    ...artworks.filter((a) => !selectedArtworks.includes(a.object_number)),
  ];

  // Remove duplicates by object_number
  const uniqueSortedArtworks = Array.from(
    new Map(sortedArtworks.map((art) => [art.object_number, art])).values()
  );

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
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();

    const updatedEventInfo = {
      ...eventInfo,
      artworkIds: selectedArtworks,
      location: selectedLocationId,
    };

    try {
      const response = await fetch(
        `https://eventdatabase.onrender.com/events/${event.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEventInfo),
        }
      );

      if (!response.ok) throw new Error("Failed to update event");

      alert("Event opdateret!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Noget gik galt under opdateringen.");
    }
  }

  async function handleDelete() {
    if (!confirm("Er du sikker på, at du vil slette dette event?")) return;

    try {
      const response = await fetch(
        `https://eventdatabase.onrender.com/events/${event.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete event");

      alert("Event slettet!");
      if (onCancel) onCancel(); // Luk boksen efter sletning
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Noget gik galt under sletningen.");
    }
  }

  return (
    <form
      className="flex flex-col shadow-md p-4 h-screen overflow-y-auto"
      onSubmit={handleUpdate}
    >
      {/* FELTER TIL EVENT-INFO */}
      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4 bg-white"
          htmlFor="titel"
        >
          Titel:
        </label>
        <input
          className="bg-gray-300 sm:ml-4 p-4 text-white w-full sm:w-1/2"
          type="text"
          id="titel"
          value={eventInfo.title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4 bg-white"
          htmlFor="kurator"
        >
          Kurator:
        </label>
        <input
          className="bg-gray-300 w-full sm:ml-4 p-4 text-white sm:w-1/2"
          type="text"
          id="kurator"
          value={eventInfo.curator}
          onChange={handleCuratorChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4 bg-white"
          htmlFor="dato"
        >
          Dato:
        </label>
        <input
          className="bg-gray-300 sm:ml-4 p-4 w-full text-white sm:w-1/2"
          type="text"
          id="dato"
          value={eventInfo.date}
          onChange={handleDateChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between shadow-md text-xl my-2">
        <label
          className="font-bold pl-4"
          htmlFor="location"
        >
          Lokation:
        </label>
        <select
          id="location"
          className="bg-gray-300 w-full text-white sm:ml-4 p-4 sm:w-1/2"
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

      <div className="my-4 shadow-md text-xl flex flex-col">
        <label
          className="font-bold mb-2 mx-4 py-2"
          htmlFor="beskrivelse"
        >
          Beskrivelse:
        </label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 h-full resize-none"
          id="beskrivelse"
          value={eventInfo.description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="flex justify-center sm_ items-center gap-4 my-4">
        <input
          type="text"
          placeholder="Søg efter titel eller kunstner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded sm:w-3/4 w-full"
        />
      </div>

      {/* 🎨 VIS KUNSTVÆRKER */}
      <h2 className="font-bold text-left pl-4 text-xl my-4">
        Vælg kunstværker til event:
      </h2>
      <div className="my-6 mx-2 md:p-5 min-h-[600px] overflow-y-auto">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:p-2">
          {uniqueSortedArtworks
            .filter((art) => {
              if (!art.has_image) return false;
              const title = art.titles?.[0]?.title?.toLowerCase() || "";
              const artist = art.artists?.[0]?.name?.toLowerCase() || "";
              const term = searchTerm.toLowerCase();
              return title.includes(term) || artist.includes(term);
            })
            .map((art) => {
              const imgSrc =
                art.image_thumbnail ||
                art.image?.thumbnail ||
                art.image?.web ||
                art.images?.[0]?.web;
              return (
                <li
                  key={art.object_number}
                  onClick={() => Select(art.object_number)}
                  className={`shadow-xl/20 rounded-md p-1 md:p-4 bg-white hover:bg-gray-200 ease-in duration-100 ${
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

      {/* LOAD MERE KNAP */}
      <button
        type="button"
        onClick={load}
        className="text-[#800000] border-2 border-[#800000] py-2 px-4 mb-10 mt-5 mx-auto hover:bg-[#800000] hover:text-white"
      >
        Indlæs flere
      </button>

      {/* ACTION-KNAPPER */}
      <div className="flex justify-center p-4 gap-8 sm:gap-20">
        <button
          type="button"
          onClick={handleDelete}
          className="bg-[#800000] text-white text-s sm:text-xl md:text-2xl lg:text-3xl grid place-items-start items-end w-full sm:w-1/4 h-[60px] px-2 py-1.5 hover:text-[#800000] hover:border-[#800000] hover:border hover:bg-white cursor-pointer"
        >
          Slet Event
        </button>
        <button
          type="submit"
          className="text-s sm:text-lg md:text-2xl lg:text-3xl grid place-items-start items-end sm:w-1/4 h-[60px] w-full px-2 py-1.5 border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer"
        >
          Opdater Event
        </button>
      </div>
    </form>
  );
}
