import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/icons";
import { tabList } from "@/config/tabs.ts";

const BottomTabBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div
      className={
        "fixed bottom-0 left-0 z-50 h-16 w-full bg-white shadow-[0px_-4px_6px_rgba(0,0,0,0.1)] transition-all md:-bottom-16 md:shadow-none"
      }
    >
      <ul className={"flex h-full"}>
        {tabList.map((tab) => (
          <li
            key={tab.path}
            onClick={() => {
              navigate(tab.path);
            }}
            className={`flex h-full  w-1/4 flex-1 cursor-pointer flex-col items-center justify-center ${
              tab.path === pathname ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Icon boxSize={6} as={tab.icon} />
            <span className={"mt-0.5"}>{tab.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomTabBar;
