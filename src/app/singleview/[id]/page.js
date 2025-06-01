import Header from "../../components/Header";
import { getArtworkById } from "../../../lib/smk";
import { getLocalData } from "../../../lib/local";
import Image from "next/image";

export default async function Singleview({ params }) {
  const { id } = params;
  const art = await getArtworkById(id);
  const allEvents = await getLocalData();
  const matchingEvents = allEvents.filter(event =>
    event.artworkIds.includes(art.object_number)
  );

  return (
    <section>
      <div key={art.id} style={{ backgroundColor: art.suggested_bg_color }}>
        <Header title="EVENTS" bgColor={art.suggested_bg_color} />

        {/* Image + Title section */}
        <div
          className="flex flex-col lg:flex-row pt-6 px-4 sm:px-6 md:px-12 pb-10 gap-8"
          style={{ backgroundColor: art.suggested_bg_color }}
        >
          <div className="w-full lg:w-[750px] flex justify-center lg:justify-start">
            <Image
              alt={art.titles?.[0]?.title || "Artwork Image"}
              width={750}
              height={750}
              priority
              className="w-full h-auto max-w-full rounded-xl shadow-2xl"
              src={art.image_thumbnail}
            />
          </div>

          <div className="flex flex-col text-left p-4 sm:p-6 text-white">
            <h1 className="font-extrabold text-3xl sm:text-4xl mb-4 leading-tight">
              {art.titles?.[0]?.title}
            </h1>
            <h2 className="font-light text-lg sm:text-xl">
              {art.techniques} <br className="sm:hidden" />- {art.artist}
            </h2>
          </div>
        </div>


        {/* Details Section */}
        <div className="flex flex-col px-4 sm:px-6 md:px-12 pb-20 pt-6 text-white space-y-10">

          {/* Artist Info */}
          <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
            <div className="lg:w-1/2 pb-5 lg:pb-0">
              <h2 className="text-2xl lg:text-3xl font-semibold">Kunstner:</h2>
            </div>
            <div className="lg:w-1/2 flex flex-col sm:flex-row gap-6 lg:gap-20">
              <div>
                <p className="font-bold text-lg pb-1">Navn</p>
                <p>{art.artist || "N/A"}</p>
              </div>
              <div>
                <p className="font-bold text-lg pb-1">Nationalitet</p>
                <p>{art.production?.[0]?.creator_nationality || "N/A"}</p>
              </div>
              <div>
                <p className="font-bold text-lg pb-1">Levetid</p>
                <p>
                  {art.production?.[0]?.creator_date_of_birth?.slice(0, 4) || "N/A"} –{" "}
                  {art.production?.[0]?.creator_date_of_death?.slice(0, 4) || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* About the Artwork */}
          <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
            <div className="lg:w-1/2 pb-5 lg:pb-0">
              <h2 className="text-2xl lg:text-3xl font-semibold">Om værket:</h2>
            </div>
            <div className="lg:w-1/2">
              <p className="leading-relaxed">{art.labels?.[0]?.text || "N/A"}</p>
            </div>
          </div>

          {/* Events */}
          <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
            <div className="lg:w-1/2 pb-5 lg:pb-0">
              <h2 className="text-2xl lg:text-3xl font-semibold">
                Værket indgår i følgende events:
              </h2>
            </div>
            <div className="lg:w-1/2 flex flex-col gap-3">
              {matchingEvents.length > 0 ? (
                matchingEvents.map((event) => (
                  <a
                    key={event.id}
                    href={`/eventsingleview/${event.id}`}
                    className="underline text-base sm:text-lg hover:opacity-80 transition"
                  >
                    {event.title}
                  </a>
                ))
              ) : (
                <p className="italic text-sm">Ingen events tilknyttet.</p>
              )}
            </div>
          </div>

          {/* Techniques & Colors */}
          <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
            <div className="lg:w-1/2 pb-5 lg:pb-0">
              <h2 className="text-2xl lg:text-3xl font-semibold">Teknik og Farver:</h2>
            </div>
            <div className="lg:w-1/2">
              <p className="pb-4">
                <strong>Teknik:</strong> {art.techniques || "N/A"}
              </p>
              <p className="pb-2 font-medium">Farver:</p>
              <div className="flex flex-wrap gap-3">
                {art.colors?.map((hex) => (
                  <div
                    key={hex}
                    className="w-10 h-10 rounded-full shadow-lg"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
