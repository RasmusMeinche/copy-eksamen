"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketDocument from "./TicketDocument";
import { useEffect, useState } from "react";

const PDFTicketButton = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookingConfirmation");
    if (stored) {
      setBookingData(JSON.parse(stored));
    }
  }, []);

  if (!bookingData) return null;

  return (
    <PDFDownloadLink
      document={
        <TicketDocument
          event={bookingData.event}
          tickets={bookingData.tickets}
          name={bookingData.name}
          email={bookingData.email}
        />
      }
      fileName={`billet-${bookingData.event.title}.pdf`}
      className="relative border border-white text-white px-4 py-5 w-40 h-14 hover:bg-white hover:text-[#800000]"
    >
      <span className="absolute bottom-2 left-2 text-left">
        Download Billetter
      </span>
    </PDFDownloadLink>
  );
};

export default PDFTicketButton;
