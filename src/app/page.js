import Header from "./components/Header";
import Footer from "./components/Footer";
import Eventliste from "./eventliste/Eventliste";

export default function Home() {
  return (
    <section>
      <Header />
      <Eventliste />
      <Footer />
    </section>
  );
}
