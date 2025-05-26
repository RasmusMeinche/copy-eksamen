"use client";
import { useState } from "react";
import { EventCard } from "./components/EventCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventCard from "./components/EventCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section>
      <Header title="EVENTS" />
      <EventCard />
    </section>
  );
}
