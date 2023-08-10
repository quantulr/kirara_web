import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Icon } from "@chakra-ui/icons";
import { ReactNode } from "react";

// import * as classNames from "classnames";

const NavigationBar = ({
  onToggleSideBar,
  sideBarVisible,
  action,
}: {
  onToggleSideBar: () => void;
  sideBarVisible: boolean;
  action?: ReactNode;
}) => {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex h-14 w-full items-center justify-between px-4 shadow-md backdrop-blur transition-all md:w-[calc(100%_-_13rem)] ${
        sideBarVisible ? "md:left-52" : "md:left-0"
      }`}
    >
      <div
        onClick={onToggleSideBar}
        className={`hidden h-7 w-7 cursor-pointer items-center justify-center rounded-md hover:bg-[#e0dbe0] active:bg-[#e0dbe0] md:flex`}
      >
        <Icon
          boxSize={5}
          as={sideBarVisible ? GoSidebarCollapse : GoSidebarExpand}
        />
      </div>
      {/*<div></div>*/}
      <div className={"flex h-10 w-10 items-center justify-center"}>
        {action}
      </div>
    </header>
  );
};

export default NavigationBar;
