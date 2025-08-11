"use client";

import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";
import ActivityIcon from "./icons/ActivityIcon";
import AidkitIcon from "./icons/AidkitIcon";
import FlightIcon from "./icons/FlightIcon";
import HotelIcon from "./icons/HotelIcon";
import NavigationIcon from "./icons/NavigationIcon";
import PackageIcon from "./icons/PackageIcon";
import StudyIcon from "./icons/StudyIcon";
import { SuitcaseIcon } from "./icons/SuitcaseIcon";
import VisaIcon from "./icons/VisaIcon";

interface PanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const Panel = ({ isOpen, onClose }: PanelProps) => {
  const { isActiveRoute } = useNavigation();
  const routeableItems = ["Flights", "Hotels", "Activities"];

  const panelItems = [
    {
      name: "Activities",
      icon: <ActivityIcon />,
    },
    {
      name: "Hotels",
      icon: <HotelIcon />,
    },
    {
      name: "Flights",
      icon: <FlightIcon />,
    },
    {
      name: "Study",
      icon: <StudyIcon />,
    },
    {
      name: "Visa",
      icon: <VisaIcon />,
    },
    {
      name: "Immigration",
      icon: <SuitcaseIcon />,
    },
    {
      name: "Medical",
      icon: <AidkitIcon />,
    },
    {
      name: "Vacation Packages",
      icon: <PackageIcon />,
    },
  ];

  const renderPanelItem = (item: (typeof panelItems)[0], index: number) => {
    const isRouteable = routeableItems.includes(item.name);
    const baseClasses =
      "flex items-center gap-3 cursor-pointer mb-6 md:mb-8 hover:scale-105 transition-transform duration-200 ease-in-out";

    if (isRouteable) {
      return (
        <Link
          key={index}
          href={`/${item.name.toLowerCase()}`}
          className={`${baseClasses} ${
            isActiveRoute(
              item.name.toLowerCase() as "flights" | "hotels" | "activities"
            )
              ? "text-custom-primary"
              : ""
          }`}
          onClick={onClose}
        >
          {item.icon}
          <span className="text-sm text-[#647995]">{item.name}</span>
        </Link>
      );
    }

    return (
      <div key={index} className={baseClasses} onClick={onClose}>
        {item.icon}
        <span className="text-sm text-[#647995]">{item.name}</span>
      </div>
    );
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 w-full h-screen 
        overflow-y-auto scrollbar-hide
        bg-white 
        transition-all duration-300 ease-in-out z-30
        md:sticky md:top-6 md:h-[calc(100vh-3rem)]
        md:w-[270px] lg:w-[300px] xl:w-[350px]
        ${
          isOpen
            ? "translate-x-0 pt-20"
            : "-translate-x-full pt-0 md:translate-x-0"
        }
      `}
    >
      <div className="p-10">
        {panelItems.map((item, index) => renderPanelItem(item, index))}
      </div>

      <div className="bg-background h-[86px] px-4 mx-6 flex items-center gap-2 justify-between sticky bottom-0 left-0">
        <div className="bg-custom-primary cursor-pointer p-3 rounded flex items-center hover:scale-105 active:scale-105 transition-transform duration-200 ease-out active:hover:bg-custom-primary-hover">
          <span className="text-sm text-white">Go</span>
        </div>

        <span className="text-xs text-[#647995]">Personal Account</span>

        <div className="cursor-pointer hover:scale-110 active:scale-110 transition-transform duration-200 ease-out">
          <NavigationIcon />
        </div>
      </div>
    </aside>
  );
};

export default Panel;
