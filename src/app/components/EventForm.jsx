"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

export default function EventForm({ event }) {
  const [eventInfo, setEventInfo] = useState({
    title: event.title,
    curator: event.curator,
    date: event.date,
    description: event.description,
  });

  const [artworks, setArtworks] = useState([]);
  const [offset, setOffset] = useState(80500);

  function loadMore() {
  fetch(`https://api.smk.dk/api/v1/art/search/?keys=*&offset=${offset}&rows=50`)
    .then((res) => res.json())
    .then((data) => {
      const newArtworks = data.items || [];
      setArtworks([...artworks, ...newArtworks]);
      setOffset(offset + 50);
    });
}

  useEffect(() => {
    loadMore();
  }, []);


  function handleTitleChange(e) {
    const updated = { ...eventInfo, title: e.target.value };
    setEventInfo(updated);

    fetch("http://localhost:8080/events", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
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

  return (
    <form className="flex flex-col shadow-md p-4 h-[600px] overflow-y-auto" action="">
      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="titel">
          Titel:
        </label>
        <input
          className="bg-gray-300 ml-4 p-4 text-white w-1/2"
          type="text"
          id="titel"
          value={eventInfo.title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="kurator">
          Kurator:
        </label>
        <input
          className="bg-gray-300 ml-4 p-4 text-white w-1/2"
          type="text"
          id="kurator"
          value={eventInfo.curator}
          onChange={handleCuratorChange}
        />
      </div>

      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="dato">
          Dato:
        </label>
        <input
          className="bg-gray-300 ml-4 p-4 text-white w-1/2"
          type="text"
          id="dato"
          value={eventInfo.date}
          onChange={handleDateChange}
        />
      </div>

      <div className="my-4 shadow-md text-xl flex flex-col">
        <label className="font-bold mb-2 mx-4 py-2" htmlFor="beskrivelse">
          Beskrivelse:
        </label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 resize-none"
          id="beskrivelse"
          value={eventInfo.description}
          onChange={handleDescriptionChange}
        />
      
      
        <ul className="grid grid-cols-5 gap-4 my-6 mx-2">
          {artworks
            .filter((art) => art.has_image)
            .map((art) => {
              const imgSrc =
                art.image_thumbnail ||
                art.image?.thumbnail ||
                art.image?.web ||
                art.images?.[0]?.web;

              return (
                <li
                  className="shadow-xl/20 rounded-md p-4 bg-white hover:bg-gray-200 ease-in duration-100"
                  key={art.id}
                >
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={art.titles?.[0]?.title || "Artwork"}
                      className="mt-2 w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="mt-2 text-gray-500">No image available</div>
                  )}
                </li>
              );
            })}
        </ul>

        <button
          type="button"
          onClick={loadMore}
          className="text-[#800000] border-2 border-[#800000] py-2 px-4 mx-auto hover:bg-[#800000] hover:text-white">Indlæs flere
        </button>

        <div className="flex justify-between">
          <Button title="Opret Event" />
          <button type="button">Slet Event</button>
        </div>
      </div>
    </form>
  );
}
