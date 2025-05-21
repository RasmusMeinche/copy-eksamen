"use client";
import { useEffect, useState } from "react";

const ConfirmedSektion = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingConfirmation");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  if (!bookingData) return <p className="text-white">Indlæser...</p>;

  const { event, tickets } = bookingData;

  return (
    <section>
      <div className="mt-4 flex justify-between items-stretch">
        <div className="flex gap-6">
          <div>
            <h2 className="text-white text-xl">Produkt:</h2>
          </div>
          <div>
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
