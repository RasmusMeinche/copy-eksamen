"use client";
import { use, useEffect, useState } from "react";
import { getLocalData } from "@/lib/local";
import EventSektion from "../components/EventSektion";
import FormSektion from "../components/FormSektion";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const eventIdFromParams = searchParams.get("id");
  const [eventData, setEventData] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const allEvents = await getLocalData("events");
  //     const selectedEvent = allEvents.find((e) => e.id === eventId);
  //     setEventData(selectedEvent);
  //   }
  //   fetchData();
  // }, [0]);
  // if (!eventData) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    async function fetchData() {
      const allEvents = await getLocalData("events");

      // Midlertidigt hardcoded ID til udvikling
      const fallbackEventId = "ff1b81f7-06ba-4c4b-96ca-a02a4e196bdb";

      const selectedEvent = allEvents.find(
        (e) => e.id === (eventIdFromParams || fallbackEventId)
      );

      setEventData(selectedEvent);
    }

    fetchData();
  }, [eventIdFromParams]); // Lyt til ændringer i URL

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#800000] py-10">
      <div className="flex flex-row">
        <div className="basis-[60%] border-t-6 border-b-6 border-r-6 border-white p-8 flex flex-col gap-4 justify-between">
          <h1 className="text-white text-4xl font-[700]">PRODUKT</h1>
          <div className="flex justify-between">
            <EventSektion event={eventData} />
            <FormSektion event={eventData} />
          </div>
        </div>
        <div className="basis-[40%]"></div>
      </div>
    </section>
  );
}
