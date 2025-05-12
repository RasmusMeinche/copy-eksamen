"use client";
import Footer from "./components/Footer";
import Eventliste from "./eventliste/Eventliste";

export default function Home() {
  return (
    <section>
      <Eventliste />
      <Footer />
    </section>
  )
}