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

      <div className="flex flex-col px-50 pb-50 text-white">
        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">Om eventet:</h1>
          </div>
          <div className="w-1/2">
            <p>{event.description}</p>
          </div>
        </div>

        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">Lokation:</h1>
          </div>
          <div className="w-1/2">
            <p>{event.location.name}</p>
            <p>{event.location.address}</p>
          </div>
        </div>

        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">Tid og Dato:</h1>
          </div>
          <div className="w-1/2">
            <p>{event.date}</p>
          </div>
        </div>

        <div className="p-5 pt-20">
          <h1 className="text-4xl mb-6 text-left">
            Følgende værker indgår i dette event
          </h1>
          <hr className="pb-10" />
          <div className="grid grid-cols-3 gap-10">
            {arts.map((artwork, index) => {
              const imageUrl =
                artwork?.image_thumbnail ||
                artwork?.image?.thumbnail ||
                artwork?.image?.web ||
                artwork?.images?.[0]?.web;

              return (
                <div key={index}>
                  <div>
                    {imageUrl ? (
                      <Link href={`/singleview/${artwork.object_number}`}>
                        <Image
                          src={imageUrl}
                          alt={"Artwork Image"}
                          width={300}
                          height={300}
                          className="bg-amber-50 max-h-[200px] object-cover"
                        />
                      </Link>
                    ) : (
                      <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-black">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-left text-md text-white">
                    {artwork?.titles?.[0]?.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
