import SideBar from "@/components/SideBar.tsx";

import "overlayscrollbars/overlayscrollbars.css";

// import useSafari100vh from "@/hooks/useSafari100vh.ts";
import useSettingsStore from "@/store/settings-store.ts";
import { Outlet } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar.tsx";

const RootLayout = () => {
  // const safariHeight = useSafari100vh();
  const showSideBar = useSettingsStore((state) => state.showSidebar);
  return (
    <div
      // style={{
      //   height: `${safariHeight}px`,
      // }}
      className={`flex w-screen pb-16 transition-all md:!h-screen md:pb-0 ${
        showSideBar ? "md:pl-52" : "md:pl-0"
      }
        `}
    >
      <SideBar visible={showSideBar} />
      <Outlet />
      <BottomTabBar />
    </div>
  );
};

export default RootLayout;
