import Image from "next/image";

interface FlightLayoutProps {
  children: React.ReactNode;
}

const FlightLayout = ({ children }: FlightLayoutProps) => {
  return (
    <main>
      <section className="p-4 md:p-6">
        <div className="w-full h-[130px] lg:h-[150px] relative">
          <Image
            src="/images/banner.jpg"
            alt="Travel Banner"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>
      {children}
    </main>
  );
};

export default FlightLayout;

export const generateMetadata = () => {
  return {
    title: "Flights",
    description: "Find the best flight options for your travel needs.",
  };
};
