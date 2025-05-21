const EventSektion = ({ event }) => {
  const { title, date, location, totalTickets, bookedTickets } = event;
  const availableTickets = totalTickets - bookedTickets;
  const isSoldOut = availableTickets <= 0;

  return (
    <div className="text-white mb-4 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="flex flex-col gap-6">
        <p>
          <strong>Lokation:</strong>
          <br />
          {location?.name}, {location?.address}
        </p>
        <p>
          <strong>Dato:</strong>
          <br />
          {new Date(date).toLocaleDateString("da-DK")}
        </p>
        <p>
          {isSoldOut ? (
            <strong>Udsolgt</strong>
          ) : (
            <>
              <strong>Billetter tilgængelige:</strong>
              <br />
              {availableTickets}x
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default EventSektion;
