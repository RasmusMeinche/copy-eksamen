'use client';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketDocument from './TicketDocument';
const PDFTicketButton = ({ event, tickets }) => (
  <PDFDownloadLink
    document={<TicketDocument event={event} tickets={tickets} />}
    fileName={`billet-${event.title}.pdf`}
    className="bg-white text-black px-4 py-2 rounded"
  >
    Download Billetter
  </PDFDownloadLink>
);
export default PDFTicketButton;