"use client";

import { useState, useEffect } from "react";
import { getLocalData } from "../../lib/local";
import Image from "next/image";
import Button from "./Button";
import { IoSearchOutline } from "react-icons/io5";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import Kuratoredit from "./Kuratoredit";
import CreateEvent from "./CreateEvent";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function EventCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const localData = await getLocalData();

      const objectDataList = await Promise.all(
        localData.map(async (event) => {
          const artworkId = event.artworkIds[0];
          const res = await fetch(
            `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
          );
          const data = await res.json();
          return {
            event,
            objectData: data.items?.[0],
          };
        })
      );

      setEvents(objectDataList);
    }
    

    fetchData();
  }, []);

  

  const filteredEvents = events.filter(({ event }) =>
    [event.title, event.curator, event.description]
      .join(" ")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  return (
    <section className="grid grid-cols-[minmax(20px,0.2fr)_1fr_minmax(20px,0.2fr)] justify-center items-center py-8 bg-[#800000] font-roboto-condensed">
      {/* Søgefelt */}
      <div className="col-start-2 mb-8 w-full flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Søg i events og værker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent placeholder:text-white focus:placeholder-transparent text-white text-sm border-2 border-slate-200 pl-3 pr-12 py-2 transition duration-300 ease focus:outline-none shadow-sm"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bottom-1 w-10 flex items-center justify-center rounded text-white text-sm hover:scale-105"
          >
            <IoSearchOutline className="scale-150" />
          </button>
        </div>
      </div>

      {/* Opret Event-knap - kun for kuratorer */}
      <SignedIn>
        <div className="flex col-start-2 justify-center mb-16 mt-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#800000] border border-white text-white text-s sm:text-lg md:text-xl lg:text-2xl xl:text-3xl grid place-items-start items-end md:w-1/4 md:h-[60px] px-2 py-1.5 hover:text-[#800000] hover:border-[#800000] hover:bg-white cursor-pointer"
          >
            Opret Event
          </button>
        </div>

        {showForm && (
          <div className="col-start-2 w-full">
            <CreateEvent onCancel={() => setShowForm(false)} />
          </div>
        )}
      </SignedIn>

      {filteredEvents.length === 0 && (
        <p className="col-start-2 text-white text-xl text-center my-10">
          Ingen events matcher din søgning.
        </p>
      )}

      {/* Events Rendering */}
      {filteredEvents.map(({ event, objectData }) => {
        const imageUrl = objectData?.image_thumbnail;

        return (
          <div
            key={event.id}
            className="col-start-2 grid grid-cols-[auto,1fr] inset-shadow-sm border border-white mb-10 mt-10 text-white w-full overflow-visible"
          >
            {/* Image Side */}
            <div className="flex gap-6 border border-white p-6 items-center">
              <div className="h-full min-w-[300px] max-w-[300px]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Event Image"
                    width={1080}
                    height={720}
                    className="bg-amber-50 object-cover max-h-[220px] w-full"
                  />
                ) : (
                  <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center text-black rounded-md">
                    No Image
                  </div>
                )}
              </div>

              {/* Text Side */}
              <div className="flex flex-col justify-between w-full leading-relaxed">
                <div className="flex justify-between items-end mb-2">
                  <h1 className="font-semibold text-3xl leading-tight max-w-[65%]">{event.title}</h1>

                  {/* Kurator Edit - only for curators */}
                  <SignedIn>
                    <Link href={`/slug/${event.id}`}>
                      <Kuratoredit />
                    </Link>
                  </SignedIn>
                </div>

                <p className="text-lg font-light mb-4 max-w-[60%]">{event.curator}</p>

                <p className="text-base font-medium max-w-[600px] md:max-w-[70%] leading-7 mb-6 line-clamp-3">
                  {event.description}
                </p>  

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                  <p className="font-extralight text-2xl">{event.date}</p>
                  <Link href={`/eventsingleview/${event.id}`}>
                    <Button title="Læs mere" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
