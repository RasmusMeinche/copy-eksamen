import { getLocalData } from "@/lib/local";
import Image from "next/image";
import { Roboto } from "next/font/google";

export const EventCard = async () => {
  const localData = await getLocalData();
  console.log(localData);

  return (
    <section className="grid justify-center items-center py-8 bg-[#800000] font-roboto-condensed">
      {localData.map((event) => {
        const imageId = event.artworkIds[0];
        const imageUrl = `https://iip-thumb.smk.dk/iiif/jp2/1z40kx99j_${imageId}.tif.jp2/full/!1024,/0/default.jpg`;
        console.log("Det her er url'en:", imageUrl);

        return (
          <div
            key={event.id}
            className="grid grid-cols-[auto,1fr] inset-shadow-sm border gap-4 mb-4 mt-4 border-white text-white w-full"
          >
            <div className="flex gap-4 border border-white p-2">
              <div>
                <Image
                  src={imageUrl}
                  alt="Event Image"
                  width={300}
                  height={300}
                  className="bg-amber-50"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h1 className="font-regular text-3xl">{event.title}</h1>
                <p className="text-sm">{event.description}</p>
                <p>{event.curator}</p>
                <p>{event.totalTickets}</p>
                  <div className="flex flex-row justify-between">
                    <p>{event.date}</p>
                    <p>{event.bookedTickets}</p>
                  </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};