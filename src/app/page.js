"use client";
import Footer from "./components/Footer";
import Kuratoredit from "./Kuratoredit";

export default function Home() {
  return (
    <section>
      <Kuratoredit variant="close" />
      <Footer />
    </section>
  );
}
