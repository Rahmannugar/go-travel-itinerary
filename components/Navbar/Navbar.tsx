"use client";

import Image from "next/image";
import SearchIcon from "./icons/SearchIcon";
import HomeIcon from "./icons/HomeIcon";
import Link from "next/link";
import ChartIcon from "./icons/ChartIcon";
import WalletIcon from "./icons/WalletIcon";
import ListIcon from "./icons/ListIcon";
import HandIcon from "./icons/HandIcon";
import BellIcon from "./icons/BellIcon";
import BasketIcon from "./icons/BasketIcon";
import PlusIcon from "./icons/PlusIcon";
import DownIcon from "./icons/DownIcon";
import MenuIcon from "./icons/MenuIcon";

interface NavbarProps {
  onToggle: () => void;
  isOpen: boolean;
}

const Navbar = ({ onToggle, isOpen }: NavbarProps) => {
  return (
    <nav className="p-4 md:p-6 w-full flex items-center justify-between gap-1 lg:gap-3 bg-white">
      <div className="flex items-center justify-between w-full relative md:w-auto lg:justify-start gap-3 lg:gap-6">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/logo.png"
            width={58}
            height={56}
            alt="Go Travel Itinerary"
            priority
          />
        </Link>

        <div className="bg-background w-full md:w-[250px] lg:w-[300px] xl:w-[250px] h-10 rounded-[4px] flex items-center gap-3 px-3 transition-all duration-300 ease-in-out">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={onToggle}
          className={`cursor-pointer md:hidden ${
            isOpen ? "fixed right-6 top-6" : ""
          } hover:scale-105 z-50 transition-transform duration-200 ease-in-out`}
        >
          <MenuIcon />
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex items-center md:gap-6">
          <div className="flex flex-col items-center cursor-pointer">
            <HomeIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Home
            </h3>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <ChartIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Dashboard
            </h3>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <WalletIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Wallet
            </h3>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <ListIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Plan a trip
            </h3>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <HandIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Commission for life
            </h3>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-6 ml-6">
          <div className="bg-[#98A2B3] h-[48px] w-[1px]"></div>
          <button className="text-white font-medium text-sm cursor-pointer  hover:bg-custom-primary-hover transition-colors ease-in-out bg-custom-primary py-3 px-4 rounded">
            Subscribe
          </button>

          <div className="flex flex-col items-center cursor-pointer">
            <BellIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Notification
            </h3>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <BasketIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Carts
            </h3>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <PlusIcon />
            <h3 className="font-medium text-[#647995] text-xs lg:text-sm">
              Create
            </h3>
          </div>
        </div>

        <div className="hidden lg:flex items-center cursor-pointer gap-2 ml-3">
          <Image
            src="/images/profile.jpg"
            width={52}
            height={52}
            alt="Profile"
          />
          <DownIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
