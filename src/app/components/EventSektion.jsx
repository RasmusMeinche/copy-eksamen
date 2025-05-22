"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const EventSektion = ({ event }) => {
  const { title, date, location, totalTickets, bookedTickets } = event;
  const availableTickets = totalTickets - bookedTickets;
  const isSoldOut = availableTickets <= 0;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const artworkId = event.artworkIds[0];
      const res = await fetch(
        `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
      );
      const smkData = await res.json();
      const img = smkData.items?.[0]?.image_thumbnail;
      setImageUrl(img);
    };

    fetchImage();
  }, [event.artworkIds]);

  return (
    <div className="text-white mb-4 flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Event Image"
            width={300}
            height={300}
            className="bg-amber-50 h-full object-cover"
          />
        ) : (
          <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-black">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <p>
          <strong>Lokation:</strong>
          <br />
          {location?.name}, {location?.address}
        </p>
        <p>
          <strong>Dato:</strong>
          <br />
          {new Date(date).toLocaleDateString("da-DK")}
        </p>
        <p>
          {isSoldOut ? (
            <strong>Udsolgt</strong>
          ) : (
            <>
              <strong>Billetter tilgængelige:</strong>
              <br />
              {availableTickets}x
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default EventSektion;
