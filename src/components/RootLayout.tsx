import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar.tsx";
import BottomTabBar from "@/components/BottomTabBar.tsx";
import NavigationBar from "@/components/NavigationBar.tsx";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import * as classNames from "classnames";

// const cx = classNames.bind(styles);

const RootLayout = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const toggleSideBar = () => {
    setShowSideBar((state) => !state);
  };
  const navClassName = classNames("flex h-screen w-screen pb-16 md:pb-0 transition-all", {
    "pl-0": !showSideBar,
    "pl-52": showSideBar
  });
  return (
    <div
      className={navClassName}
    >
      <SideBar visible={showSideBar} />
      <NavigationBar
        onToggleSideBar={toggleSideBar}
        sideBarVisible={showSideBar}
      />
      <OverlayScrollbarsComponent
        className={"h-full w-full pt-14"}
        options={{
          scrollbars: {
            autoHide: "leave",
            theme: "os-theme-dark",
            autoHideDelay: 100
          },
          showNativeOverlaidScrollbars: false
        }}
        defer
      >
        <Outlet />
      </OverlayScrollbarsComponent>
      <BottomTabBar />
    </div>
  );
};

export default RootLayout;
