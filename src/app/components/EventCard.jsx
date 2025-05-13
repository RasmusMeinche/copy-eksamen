import { getLocalData } from "@/lib/local";
import Image from "next/image";

// Henter den endelige billede-URL ved at følge redirect
const getFinalImageUrl = async (artworkId) => {
  try {
    const response = await fetch(`https://open.smk.dk/artwork/image/${artworkId}`, {
      method: "HEAD", // kun headers, vi skal ikke hente billedet
      redirect: "follow",
    });

    return response.url || null;
  } catch (error) {
    console.error("Kunne ikke hente billede:", error);
    return null;
  }
};

export const EventCard = async () => {
  const localData = await getLocalData(); // Henter event-data lokalt (fra fx http://localhost:8080)

  const enrichedData = await Promise.all(
    localData.map(async (event) => {
      const artworkId = event.artworkIds?.[0]; // Tag første artworkId
      const smkImage = artworkId ? await getFinalImageUrl(artworkId) : null;

      return {
        ...event,
        smkImage,
      };
    })
  );

  return (
    <section className="py-8 bg-[#800000] grid grid-cols-1 place-items-center gap-8">
      {enrichedData.map((event) => (
        <div
          key={event.id}
          className="border border-white text-white p-4 w-full max-w-3xl shadow-md"
        >
          {event.smkImage ? (
            <Image
              src={event.smkImage}
              alt={event.title}
              width={300}
              height={300}
              className="bg-amber-50"
            />
          ) : (
            <p className="text-sm italic">Intet billede tilgængeligt</p>
          )}
          <h1 className="font-bold text-2xl mt-4">{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.curator}</p>
          <p>Billetter: {event.bookedTickets} / {event.totalTickets}</p>
        </div>
      ))}
    </section>
  );
};