"use client";
import React, { Suspense } from "react";
import EventSektion from "../components/EventSektion";
import FormSektion from "../components/FormSektion";
import Header from "../components/Header";
import { getLocalData } from "../../lib/local";
import { useSearchParams } from "next/navigation";

function EventLoader({ eventId }) {
  const [eventData, setEventData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const allEvents = await getLocalData("events");
      const fallbackEventId = "e8609e62-2c96-462d-bbcc-cfc2c3952a25";
      const selectedEvent = allEvents.find(
        (e) => e.id === (eventId || fallbackEventId)
      );
      setEventData(selectedEvent);
    }
    fetchData();
  }, [eventId]);

  if (!eventData) {
    return <div>Loading event...</div>;
  }

  return (
    <>
      <EventSektion event={eventData} />
      <FormSektion event={eventData} />
    </>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const eventIdFromParams = searchParams.get("id");

  return (
    <section className="bg-[#800000]">
      <Header title="EVENTS" />
      <div className="py-10">
        <div className="flex flex-row">
          <div className="basis-[60%] border-t-6 border-b-6 border-r-6 border-white p-8 flex flex-col gap-4 justify-between">
            <h1 className="text-white text-4xl font-[700]">PRODUKT</h1>
            <div className="flex flex-col justify-between md:flex-col lg:flex-row gap-4">
              <Suspense fallback={<div>Loading...</div>}>
                <EventLoader eventId={eventIdFromParams} />
              </Suspense>
            </div>
          </div>
          <div className="basis-[40%]"></div>
        </div>
      </div>
    </section>
  );
}
