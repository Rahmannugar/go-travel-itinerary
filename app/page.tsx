"use client";

import FlightSection from "@/components/Flight/FlightSection";
import Itinerary from "@/components/Itinerary/Itinerary";
import Navbar from "@/components/Navbar/Navbar";
import Panel from "@/components/Panel/Panel";
import { useMenuToggle } from "@/hooks/useMenuToggle";

const Home = () => {
  const { isOpen, handleToggle } = useMenuToggle();

  return (
    <main className="min-h-screen bg-background">
      <Navbar onToggle={handleToggle} isOpen={isOpen} />
      {/* Add width constraint to the flex container */}
      <div className="md:flex md:items-start justify-between gap-6 xl:gap-10 p-4 md:p-6 max-w-[1800px] mx-auto">
        <Panel isOpen={isOpen} />

        {/* Remove flex-1 since we'll use width constraints */}
        <div className="w-full max-w-[1500px] bg-white">
          <Itinerary />
          <FlightSection />
        </div>
      </div>
    </main>
  );
};

export default Home;
