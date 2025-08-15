"use client";

import Navbar from "@/components/Navbar/Navbar";
import Panel from "@/components/Panel/Panel";
import { useMenuToggle } from "@/lib/hooks/useMenuToggle";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, handleToggle } = useMenuToggle();

  return (
    <main className="min-h-screen bg-background pt-20 md:pt-28">
      <Navbar onToggle={handleToggle} />
      <div className="md:flex md:items-start justify-between gap-6 xl:gap-10 p-4 md:p-6 max-w-[1800px] mx-auto relative">
        <Panel isOpen={isOpen} onClose={handleToggle} />
        <div className="w-full max-w-[1500px] bg-white">{children}</div>
      </div>
    </main>
  );
};

export default LayoutClient;
