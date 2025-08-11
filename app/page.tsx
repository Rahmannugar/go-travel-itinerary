"use client";

import FlightSection from "@/components/Flight/components/FlightSection";
import HotelSection from "@/components/Hotel/components/HotelSection";
import Itinerary from "@/components/Itinerary/Itinerary";

const Home = () => {
  return (
    <>
      <Itinerary />
      <FlightSection />
      <HotelSection />
    </>
  );
};

export default Home;
