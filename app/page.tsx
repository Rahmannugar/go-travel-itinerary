"use client";

import ActivitySection from "@/components/Activity/components/ActivitySection";
import FlightSection from "@/components/Flight/components/FlightSection";
import HotelSection from "@/components/Hotel/components/HotelSection";
import Itinerary from "@/components/Itinerary/icons/Itinerary";

const Home = () => {
  return (
    <>
      <Itinerary />
      <FlightSection />
      <HotelSection />
      <ActivitySection />
    </>
  );
};

export default Home;
