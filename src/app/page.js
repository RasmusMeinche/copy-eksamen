"use client";
import { useState } from "react";
import { EventCard } from "./components/EventCard";
import Header from "./components/Header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section>
      <Header
        title="EVENTS"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <EventCard searchQuery={searchQuery} />
    </section>
  );
}
