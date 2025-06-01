"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import PDFTicketButton from "./PDFTicketButton";

const ConfirmedSektion = () => {
  const [bookingData, setBookingData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingConfirmation");
    if (data) {
      const parsedData = JSON.parse(data);
      setBookingData(parsedData);

      const total = parsedData.event.totalTickets;
      const previouslyBooked = parsedData.event.bookedTickets;
      const justBooked = parsedData.tickets;
      const newTotalBooked = previouslyBooked + justBooked;
      const remaining = total - newTotalBooked;

      const fetchImage = async () => {
        const artworkId = parsedData.event.artworkIds[0];
        const res = await fetch(
          `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
        );
        const smkData = await res.json();
        const img = smkData.items?.[0]?.image_thumbnail;
        setImageUrl(img);
      };

      fetchImage();
    }
  }, []);

  if (!bookingData) return <p className="text-white">Indlæser...</p>;

  const { event, tickets } = bookingData;

  return (
    <section className="px-4">
      <div className="mt-4 flex flex-col lg:flex-row justify-between gap-6">
        {/* Venstre side: billede + info */}
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-3/4">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-white text-2xl font-bold mb-2 text-center lg:text-left">
              {event.title}
            </h2>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Event Image"
                width={300}
                height={300}
                className="bg-amber-50 object-cover w-full max-w-[300px] h-auto"
              />
            ) : (
              <div className="w-full max-w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-black">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-end gap-6 text-center lg:text-left">
            <p className="text-white text-lg">
              <strong>Lokation:</strong>
              <br />
              {event.location?.address}
            </p>
            <p className="text-white text-lg">
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

        {/* Højre side: antal billetter + knap */}
        <div className="flex flex-col items-center lg:items-end justify-end gap-6 w-full lg:w-1/4 text-center lg:text-right">
          <p className="text-white text-lg">
            <strong>Antal Billetter:</strong>
            <br />
            {tickets}x
          </p>
          <PDFTicketButton/>
        </div>
      </div>
    </section>
  );
};

export default ConfirmedSektion;
