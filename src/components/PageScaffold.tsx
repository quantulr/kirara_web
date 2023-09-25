import NavigationBar from "@/components/NavigationBar.tsx";
import {
  // OverlayScrollbarsComponent,
  useOverlayScrollbars,
} from "overlayscrollbars-react";

import useSettingsStore from "@/store/settings-store.ts";
import { ReactNode, useEffect, useRef } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const PageScaffold = ({
  children,
  action,
  title,
}: {
  children: ReactNode;
  action?: ReactNode;
  title?: string;
}) => {
  const isMobile = useMediaQuery("only screen and (max-width : 767px)"); // width < 768
  const showSideBar = useSettingsStore((state) => state.showSidebar);
  const toggleSideBar = useSettingsStore((state) => state.toggleSidebar);
  const ref = useRef(null);
  const [initialize, _instance] = useOverlayScrollbars({
    options: {
      scrollbars: {
        autoHide: "leave",
        theme: "os-theme-dark",
        autoHideDelay: 100,
      },
    },
    defer: true,
  });
  useEffect(() => {
    if (ref.current) {
      initialize(ref.current);
    }
  }, [initialize]);
  return (
    <>
      <NavigationBar
        onToggleSideBar={toggleSideBar}
        sideBarVisible={showSideBar}
        action={action}
        title={title}
      />
      {isMobile ? (
        <div className={"mobile-scroll-wrap w-full pt-14"}>{children}</div>
      ) : (
        <div ref={ref} className={"desktop-scroll-wrap h-full w-full pt-14"}>
          {children}
        </div>
      )}
    </>
  );
};

export default PageScaffold;
