import { getLocalData } from "@/lib/local";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default async function EventSingleView({ params }) {
  const { id } = params;
  const allEvents = await getLocalData();
  const event = allEvents.find((e) => e.id === id);

  if (!event) return notFound();

  const arts = await Promise.all(
    event.artworkIds.map(async (artworkId) => {
      const res = await fetch(
        `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
      );
      const data = await res.json();
      return data.items?.[0];
    })
  );

  return (
    <div className="bg-blue-300">
      <Header />
      <div className="h-screen text-white">
        <div className="px-[10%] py-[10%] mt-[5%] border-b-6 border-t-6 border-r-6 w-[60%]">
          <h1 className="text-5xl font-medium">{event.title}</h1>
          <h2 className="text-4xl font-thin pb-15">Periode</h2>
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

      <div className="flex flex-col px-50 pb-50 pt-20 text-black">
        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">| Om eventet</h1>
          </div>
          <div className="w-1/2">
            <p>{event.description}</p>
          </div>
        </div>

        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">| Lokation</h1>
          </div>
          <div className="w-1/2">
            <p>{event.location.name}</p>
            <p>{event.location.address}</p>
          </div>
        </div>

        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">| Tid og Dato</h1>
          </div>
          <div className="w-1/2">
            <p>{event.date}</p>
          </div>
        </div>

        <div className="flex flex-row p-5">
          <div className="w-1/2">
            <h1 className="text-4xl">| Værker</h1>
          </div>
          <div className="w-1/2 flex flex-wrap gap-4">
            {arts.map((art, index) => {
              const imageUrl = art?.image_thumbnail;
              return imageUrl ? (
                <Link
                  href={`/singleview/${art.object_number}`}
                  key={index}
                >
                  <Image
                    key={index}
                    src={imageUrl}
                    alt="Event Artwork"
                    width={300}
                    height={300}
                    className="bg-amber-50 h-full max-h-[220px] object-cover"
                  />
                </Link>
              ) : (
                <div
                  key={index}
                  className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-black"
                >
                  No Image
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
