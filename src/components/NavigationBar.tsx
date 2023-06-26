import { GoSidebarExpand } from "react-icons/go";
import { IconButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

const NavigationBar = () => {
  return (
    <header
      className={
        "fixed left-0 right-0 top-0 flex h-14 w-full items-center justify-between px-4 shadow-md backdrop-blur transition-all md:left-52"
      }
    >
      <IconButton
        className={"!hidden !rounded-full md:!inline-flex"}
        aria-label={"Toggle Sidebar"}
        icon={<Icon boxSize={5} as={GoSidebarExpand} />}
      />
    </header>
  );
};

export default NavigationBar;
