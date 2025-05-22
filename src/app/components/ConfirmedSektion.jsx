"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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

      console.log("Samlet antal billetter:", total);
      console.log("Allerede booket før:", previouslyBooked);
      console.log("Lige booket nu:", justBooked);
      console.log("Opdateret antal bookede:", newTotalBooked);
      console.log("Billetter tilbage:", remaining);

      // Hent billedet fra SMK API
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
    <section>
      <div className="mt-4 flex justify-between items-stretch">
        <div className="flex gap-6">
          <div className="flex gap-6 items-stretch">
            <div className="flex flex-col">
              <h2 className="text-white text-2xl font-bold mb-2">
                {event.title}
              </h2>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Event Image"
                  width={300}
                  height={300}
                  className="bg-amber-50 object-cover"
                />
              ) : (
                <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-black">
                  No Image
                </div>
              )}
            </div>
            <div className="flex flex-col justify-end gap-6">
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
        </div>
        <div className="flex flex-col justify-end items-center gap-6">
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
