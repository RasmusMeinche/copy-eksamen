'use client';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketDocument from './TicketDocument';
const PDFTicketButton = ({ event, tickets }) => (
  <PDFDownloadLink
    document={<TicketDocument event={event} tickets={tickets} />}
    fileName={`billet-${event.title}.pdf`}
    className="relative border border-white text-white px-4 py-5 w-40 h-14 hover:bg-white hover:text-[#800000]">
    <span className="absolute bottom-2 left-2 text-left">Download Billetter</span>
  </PDFDownloadLink>
);
export default PDFTicketButton;