import React from "react";
import MobileNavigation from "./MobileNavigation";
import Logo from "./icons/Logo";
import DesktopNavigation from "./DesktopNavigation";

const Header = ({ navigation }) => {
  return (
    <header className="flex flex-row bg-darkYellow px-2 py-0 sticky top-0 left-0 right-0 z-40">
      <div className="mr-4 sm:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="flex flex-grow items-center whitespace-nowrap">
        <Logo className="h-9 w-16 ml-0 lg:ml-3" />
        <span className="pl-2">Boat Used Part Search</span>
      </div>
      <div className="hidden sm:flex justify-end items-end sm:flex-row">
        <DesktopNavigation navigation={navigation} />
      </div>
    </header>
  );
};

export default Header;
