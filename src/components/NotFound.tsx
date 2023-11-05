import notfoundImg from "@/assets/404.png";
import { Button } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (isRouteErrorResponse(error) && error.status === 404)
    return (
      <div className={"flex h-screen w-screen items-center justify-center"}>
        <div
          className={"flex w-3/4 flex-col items-center justify-center md:w-96"}
        >
          <img className={"w-full"} src={notfoundImg} alt={"404 not found"} />
          <Button
            onClick={() => {
              navigate("/");
            }}
            bgColor={"#000"}
            color={"#fff"}
            className={"mt-8 !rounded-full"}
          >
            返回首页
          </Button>
        </div>
      </div>
    );
  throw error;
};
export default NotFound;
