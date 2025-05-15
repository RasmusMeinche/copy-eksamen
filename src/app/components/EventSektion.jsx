const EventSektion = ({ event }) => {
  const { title, date, location, totalTickets, bookedTickets } = event;
  const availableTickets = totalTickets - bookedTickets;
  const isSoldOut = availableTickets <= 0;

  return (
    <div className="text-white mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-1">
        Lokation: {location?.name}, {location?.address}
      </p>
      <p className="mt-1">Dato: {new Date(date).toLocaleDateString("da-DK")}</p>
      <p className="mt-1">
        {isSoldOut ? "Udsolgt" : `Billetter tilgængelige: ${availableTickets}`}
      </p>
    </div>
  );
};

export default EventSektion;
