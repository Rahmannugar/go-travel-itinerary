"use client";

import Navbar from "@/components/Navbar/Navbar";
import Panel from "@/components/Panel/Panel";
import { useMenuToggle } from "@/hooks/useMenuToggle";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, handleToggle } = useMenuToggle();

  return (
    <main className="min-h-screen bg-background">
      <Navbar onToggle={handleToggle} />
      <div className="h-[calc(100vh-80px)] pt-20 md:pt-28">
        <div className="md:flex md:items-start gap-6 xl:gap-10 p-4 md:p-6 max-w-[1800px] mx-auto relative h-full">
          <Panel isOpen={isOpen} onClose={handleToggle} />
          <div className="w-full max-w-[1500px] bg-white overflow-y-auto h-full">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutClient;
