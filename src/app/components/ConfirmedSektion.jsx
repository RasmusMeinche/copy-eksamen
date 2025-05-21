"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const ConfirmedSektion = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingConfirmation");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  if (!bookingData) return <p className="text-white">Indlæser...</p>;

  const { title, event, tickets } = bookingData;

  return (
    <section>
      <div className="mt-4 flex justify-between items-stretch">
        <div className="flex gap-6">
          <div>
            <h2 className="text-white text-xl">Produkt:</h2>
          </div>
          <div>
            <div className="flex flex-col pb-4">
              <h2 className="text-white text-2xl font-bold mb-2">
                {event.title}
              </h2>
              <Image
                src={`https://iip-thumb.smk.dk/iiif/jp2/1z40kx99j_${event.artworkIds[0]}.tif.jp2/full/!1024,/0/default.jpg`}
                alt="Event Image"
                width={300}
                height={300}
                className="bg-amber-50 h-full object-cover"
              />
            </div>
            <p className="text-white text-lg">
              <strong>Lokation:</strong>
              <br />
              {event.location?.address}
            </p>
            <p className="mt-2 text-white text-lg">
              <strong>Dato:</strong>
              <br />
              {new Date(event.date).toLocaleDateString("da-DK", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-white text-lg">
            <strong>Antal Billetter:</strong>
            <br />
            {tickets}x
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConfirmedSektion;
