"use client";
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import EventCard from "./components/EventCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section>
      <Hero>
        <Header
        title="EVENTS"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      </Hero>
      <EventCard searchQuery={searchQuery} />
    </section>
  );
}
