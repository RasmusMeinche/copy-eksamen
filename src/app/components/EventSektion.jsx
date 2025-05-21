import Image from "next/image";

const EventSektion = ({ event }) => {
  const { title, date, location, totalTickets, bookedTickets } = event;
  const availableTickets = totalTickets - bookedTickets;
  const isSoldOut = availableTickets <= 0;

  return (
    <div className="text-white mb-4 flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <Image
          src={`https://iip-thumb.smk.dk/iiif/jp2/1z40kx99j_${event.artworkIds[0]}.tif.jp2/full/!1024,/0/default.jpg`}
          alt="Event Image"
          width={300}
          height={300}
          className="bg-amber-50 h-full object-cover"
        />
      </div>
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
