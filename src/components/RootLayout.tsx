import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar.tsx";
import BottomTabBar from "@/components/BottomTabBar.tsx";
import NavigationBar from "@/components/NavigationBar.tsx";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";

const RootLayout = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const toggleSideBar = () => {
    setShowSideBar((state) => !state);
  };

  return (
    <div
      className={`flex h-screen w-screen pb-16 transition-all md:pb-0 ${
        showSideBar ? "md:pl-52" : "md:pl-0"
      }
        `}
    >
      <SideBar visible={showSideBar} />
      <NavigationBar
        onToggleSideBar={toggleSideBar}
        sideBarVisible={showSideBar}
      />
      <OverlayScrollbarsComponent
        className={"main-scroll-wrap h-full w-full pt-14"}
        options={{
          scrollbars: {
            autoHide: "leave",
            theme: "os-theme-dark",
            autoHideDelay: 100,
          },
          showNativeOverlaidScrollbars: false,
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
