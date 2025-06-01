import { getLocalData } from "../../../lib/local";
import { getArtworkById } from "../../../lib/smk";

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Link from "next/link";
import Image from "next/image";

export default async function EventSingleView({ params }) {
  const { id } = await params;
  const allEvents = await getLocalData();
  const event = allEvents.find((e) => e.id === id);

  if (!event) return notFound();

  const arts = await Promise.all(
    event.artworkIds.map((artworkId) => getArtworkById(artworkId))
  );

  const firstArtwork = arts[0];
  const backgroundColor = firstArtwork?.suggested_bg_color || "#800000";
  const imageUrl =
    firstArtwork?.image_thumbnail ||
    firstArtwork?.image?.thumbnail ||
    firstArtwork?.image?.web ||
    firstArtwork?.images?.[0]?.web;

  return (
    <div style={{ backgroundColor }}>
      <Header
        title="EVENTS"
        bgColor={backgroundColor}
      />

      <div
        className="relative h-[60vh] mb-24"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative px-[10%] py-[10%] mt-[5%] border-6 border-white border-l-0 w-[60%] text-white">
          <h1 className="text-5xl font-medium pb-15">{event.title}</h1>
          <Link href={`/checkout?id=${event.id}`}>
            <button
              type="submit"
              className="relative border border-white px-4 py-5 w-40 h-14 hover:bg-white hover:text-[#800000]"
            >
              <span className="absolute bottom-2 left-2 text-left">
                Book Billetter
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Event Info Section */}
      <div className="flex flex-col px-4 sm:px-6 md:px-12 pb-20 pt-6 text-white space-y-10">

        {/* Om eventet */}
        <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
          <div className="lg:w-1/2 pb-5 lg:pb-0">
            <h2 className="text-2xl lg:text-3xl font-semibold">Om eventet:</h2>
          </div>
          <div className="lg:w-1/2">
            <p className="leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Lokation */}
        <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
          <div className="lg:w-1/2 pb-5 lg:pb-0">
            <h2 className="text-2xl lg:text-3xl font-semibold">Lokation:</h2>
          </div>
          <div className="lg:w-1/2">
            <p className="font-bold text-lg pb-1">{event.location.name}</p>
            <p>{event.location.address}</p>
          </div>
        </div>

        {/* Tid og Dato */}
        <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
          <div className="lg:w-1/2 pb-5 lg:pb-0">
            <h2 className="text-2xl lg:text-3xl font-semibold">Tid og Dato:</h2>
          </div>
          <div className="lg:w-1/2">
            <p>{event.date}</p>
          </div>
        </div>

        {/* Værker */}
        <div className="flex flex-col lg:flex-row p-5 bg-white/10 shadow-lg">
          <div className="lg:w-1/2 pb-5 lg:pb-0">
            <h2 className="text-2xl lg:text-3xl font-semibold">
              Følgende værker indgår i dette event:
            </h2>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {arts.map((artwork, index) => {
              const imageUrl =
                artwork?.image_thumbnail ||
                artwork?.image?.thumbnail ||
                artwork?.image?.web ||
                artwork?.images?.[0]?.web;

              return (
                <div key={index}>
                  {imageUrl ? (
                    <Link href={`/singleview/${artwork.object_number}`}>
                      <Image
                        src={imageUrl}
                        alt="Artwork"
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover bg-amber-50 rounded-lg shadow-lg"
                      />
                    </Link>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-black rounded-lg">
                      No Image
                    </div>
                  )}
                  <p className="mt-3 text-md">{artwork?.titles?.[0]?.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
