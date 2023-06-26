import { useLocation, useNavigate } from "react-router-dom";
import { tabList } from "@/config/tabs.ts";
import { Icon } from "@chakra-ui/icons";

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div
      className={
        "side-bar fixed -left-52 bottom-0 top-0 h-full w-52 bg-[#e7e1e7] p-2 shadow-md transition-all md:left-0"
      }
    >
      <ul>
        {tabList.map((tab) => (
          <li
            key={tab.path}
            onClick={() => {
              navigate(tab.path);
            }}
            className={`flex h-7 w-full cursor-pointer items-center justify-start rounded-md pl-4 ${
              tab.path === pathname ? "bg-[#47a1ff] text-white" : "text-black"
            }`}
          >
            <Icon
              boxSize={4}
              className={`${
                tab.path === pathname ? "text-white" : "!text-[#47a1ff]"
              }`}
              as={tab.icon}
            />
            <span className={"ml-2"}>{tab.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
