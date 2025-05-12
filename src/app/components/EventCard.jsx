import { getLocalData } from "@/lib/local";

export const EventCard = async () => {
  const localData = await getLocalData();
  console.log(localData);

  return (
    <section className="flex flex-col justify-center items-center py-8 bg-[#800000]">
          {localData.map((event) => (
            <div className="flex flex-col inset-shadow-sm bg-white p-4 w-[80%]" key={event.id}>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.curator}</p>
              <p>{event.totalTickets}</p>
              <p>{event.bookedTickets}</p>
            </div>
          ))}
    </section>
  );
};