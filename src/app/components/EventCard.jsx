"use client";

import { useState, useEffect } from "react";
import { getLocalData } from "@/lib/local";
import Image from "next/image";
import Button from "./Button";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Kuratoredit from "./Kuratoredit";
import CreateEvent from "./CreateEvent";

export default function EventCard() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const localData = await getLocalData();

      const objectDataList = await Promise.all(
        localData.map(async (event) => {
          const artworkId = event.artworkIds[0];
          const res = await fetch(`https://api.smk.dk/api/v1/art?object_number=${artworkId}`);
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

  return (
    <ClerkProvider>
      <SignedIn>
        <section className="grid grid-cols-[minmax(20px,0.2fr)_1fr_minmax(20px,0.2fr)] justify-center items-center py-8 bg-[#800000] font-roboto-condensed">
          <div className="flex col-start-2 justify-center mb-16 mt-16">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#800000] border border-white text-white text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 hover:text-[#800000]  hover:border-[#800000] hover:border hover:bg-white cursor-pointer"
            >
              Opret Event
            </button>
          </div>

          {showForm && (
            <div className="col-start-2 w-full">
              <CreateEvent onCancel={() => setShowForm(false)} />
            </div>
          )}

          {events.map(({ event, objectData }) => {
            const imageUrl = objectData?.image_thumbnail;

            return (
              <div
                key={event.id}
                className="col-start-2 grid grid-cols-[auto,1fr] inset-shadow-sm border mb-10 mt-10 border-white text-white w-full overflow-visible"
              >
                <div className="flex gap-4 border border-white items-center p-4">
                  <div className="h-full">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Event Image"
                        width={300}
                        height={300}
                        className="bg-amber-50 h-full max-h-[220px] object-cover"
                      />
                    ) : (
                      <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-black">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between w-full leading-none">
                    <div className="flex flex-row justify-between items-end">
                      <h1 className="font-medium text-3xl">{event.title}</h1>
                      <Link href={`/slug/${event.id}`}>
                        <Kuratoredit />
                      </Link>
                    </div>
                    <p className="mb-4 font-thin text-xl">{event.curator}</p>
                    <p className="text-m font-medium max-w-[550px] w-[50%] mb-4 leading-6">
                      {event.description}
                    </p>
                    <div className="flex flex-row justify-between items-end">
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
      </SignedIn>
    </ClerkProvider>
  );
}
