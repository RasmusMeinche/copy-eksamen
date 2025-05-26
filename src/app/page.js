import Header from "./components/Header";
import Footer from "./components/Footer";
import EventCard from "./components/EventCard";

export default function Home() {
  return (
    <section>
      <Header title="EVENTS" />
      <EventCard />
    </section>
  );
}
