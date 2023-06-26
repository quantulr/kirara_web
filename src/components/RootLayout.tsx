import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar.tsx";
import BottomTabBar from "@/components/BottomTabBar.tsx";
import NavigationBar from "@/components/NavigationBar.tsx";

const RootLayout = () => {
  return (
    <div className={"flex h-screen w-screen pb-16 pt-14 md:pb-0 md:pl-52"}>
      <SideBar />
      <NavigationBar />
      <main className={"h-full w-full"}>
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
};
export default RootLayout;
