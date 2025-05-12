import { getLocalData } from "@/lib/local";
import Image from "next/image";

export const EventCard = async () => {
  const localData = await getLocalData();
  console.log(localData);

  return (
    <section className="grid grid-cols-[auto,1fr,auto] justify-center items-center py-8 bg-[#800000]">
          {localData.map((event) => (
            <div className="col-start-2 col-end-4 grid grid-cols-[auto,1fr] inset-shadow-sm border mb-4 mt-4 border-white text-white w-full" key={event.id}>
                <div className="flex gap-4 relative">
                <div className="col-1 flex">
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={300}
                        height={300}
                        className="bg-amber-50"
                    />
                </div>
                <div>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                    <p>{event.curator}</p>
                    <p>{event.totalTickets}</p>
                    <p>{event.bookedTickets}</p>
              </div>
              </div>
            </div>
          ))}
    </section>
  );
};