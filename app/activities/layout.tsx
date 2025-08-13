import Image from "next/image";

interface ActivityLayoutProps {
  children: React.ReactNode;
}

const ActivityLayout = ({ children }: ActivityLayoutProps) => {
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

export default ActivityLayout;

export const generateMetadata = () => {
  return {
    title: "Activities",
    description: "Find the best activities for your stay",
  };
};
