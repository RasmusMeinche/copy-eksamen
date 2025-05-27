"use client";
import { useEffect, useState } from "react";
import { getLocalData } from "../../lib/local";
import EventSektion from "../components/EventSektion";
import FormSektion from "../components/FormSektion";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

export default function Home() {
  const searchParams = useSearchParams();
  const eventIdFromParams = searchParams.get("id");
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const allEvents = await getLocalData("events");

      const fallbackEventId = "e8609e62-2c96-462d-bbcc-cfc2c3952a25";

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
    <section className="bg-[#800000]">
      <Header title="EVENTS" />
      <div className="py-10">
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
      </div>
    </section>
  );
}
