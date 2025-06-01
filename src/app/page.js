"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import EventCard from "./components/EventCard";

export default function Home() {
  return (
    <section>
      <Hero>
        <Header
          title="EVENTS"
          showAuth={true}
        />
      </Hero>
      <EventCard />
    </section>
  );
}
