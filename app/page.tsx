"use client";

import Itinerary from "@/components/Itinerary/Itinerary";
import Navbar from "@/components/Navbar/Navbar";
import Panel from "@/components/Panel/Panel";
import { useMenuToggle } from "@/hooks/useMenuToggle";

const Home = () => {
  const { isOpen, handleToggle } = useMenuToggle();

  return (
    <main className="min-h-screen bg-background">
      <Navbar onToggle={handleToggle} isOpen={isOpen} />
      <div className="md:flex md:items-start justify-between gap-6 xl:gap-10 p-4 md:p-6">
        <Panel isOpen={isOpen} />
        <div className="flex-1">
          <Itinerary />
        </div>
      </div>
    </main>
  );
};

export default Home;
