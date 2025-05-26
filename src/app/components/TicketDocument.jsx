import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});
const TicketDocument = ({ event, tickets }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <Text style={styles.title}>{event.title}</Text>
      <View>
        <Text>Lokation: {event.location.address}</Text>
        <Text>Dato: {new Date(event.date).toLocaleDateString('da-DK')}</Text>
        <Text>Billetter: {tickets}x</Text>
      </View>
    </Page>
  </Document>
);
export default TicketDocument;