import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingTop: 40,
    paddingRight: 40,
    paddingBottom: 40,
    paddingLeft: 0,
    fontSize: 10,
  },
  frame: {
    borderTop: '4 solid #800000',
    borderRight: '4 solid #800000',
    borderBottom: '4 solid #800000',
    padding: 20,
    paddingLeft: 40,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  column: {
    width: '48%',
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: '700',
    marginTop: 6,
  },
  infoText: {
    marginBottom: 4,
    fontWeight: '400',
  },
});


const TicketDocument = ({ event, tickets, name, email }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.frame}>
        <Text style={styles.title}>Event: {event.title}</Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.infoLabel}>Navn:</Text>
            <Text style={styles.infoText}>{name}</Text>

            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{email}</Text>

            <Text style={styles.infoLabel}>Lokation:</Text>
            <Text style={styles.infoText}>{event.location.address}</Text>

            <Text style={styles.infoLabel}>Dato:</Text>
            <Text style={styles.infoText}>
              {new Date(event.date).toLocaleDateString('da-DK')}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.infoLabel}>Antal Billetter:</Text>
            <Text style={styles.infoText}>{tickets}x</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default TicketDocument;
