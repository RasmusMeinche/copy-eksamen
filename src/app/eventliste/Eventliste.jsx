import { getLocalData } from "@/lib/local";

const Eventliste = async () => {
  const localData = await getLocalData();
  console.log(localData);

  return (
    <section className="flex flex-col justify-center">
          {localData.map((event) => (
            <div key={event.id}>
              {event.title}
              {event.description}
              {event.date}
              {event.curator}
              {event.totalTickets}
              {event.bookedTickets}
            </div>
          ))}
    </section>
  );
};

export default Eventliste;
