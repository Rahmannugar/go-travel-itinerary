interface HotelLayoutProps {
  children: React.ReactNode;
}

const HotelLayout = ({ children }: HotelLayoutProps) => {
  return <main>{children}</main>;
};

export default HotelLayout;

export const generateMetadata = () => {
  return {
    title: "Hotels",
    description: "Find the best hotels for your stay",
  };
};
