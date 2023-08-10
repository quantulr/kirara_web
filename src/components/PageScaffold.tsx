import NavigationBar from "@/components/NavigationBar.tsx";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import useSettingsStore from "@/store/settings-store.ts";
import { ReactNode } from "react";

const PageScaffold = ({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) => {
  const showSideBar = useSettingsStore((state) => state.showSidebar);
  const toggleSideBar = useSettingsStore((state) => state.toggleSidebar);

  return (
    <>
      <NavigationBar
        onToggleSideBar={toggleSideBar}
        sideBarVisible={showSideBar}
        action={action}
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
        {children}
      </OverlayScrollbarsComponent>
    </>
  );
};

export default PageScaffold;
