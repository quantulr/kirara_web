import { useFormik } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { login } from "@/api/login.ts";
import useUserStore from "@/store/user-store.ts";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("用户名不能为空")
    .matches(/^[a-zA-Z0-9_]+$/, "用户名只能包含字母、数字和下划线")
    .max(12, "用户名不能超过12个字符"),
  password: Yup.string()
    .required("密码不能为空")
    .matches(/^[a-zA-Z0-9_]+$/, "密码只能包含字母、数字和下划线")
    .max(16, "密码不能超过16个字符"),
});
const Login = () => {
  const toast = useToast();
  const setToken = useUserStore((state) => state.setToken);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, formikHelpers) => {
      login({
        ...values,
      })
        .then((response) => {
          setToken(response.token);
          toast({
            title: "登录成功",
            status: "success",
            position: "top",
          });
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    },
    validationSchema: loginSchema,
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((state) => !state);
  return (
    <div
      className={
        "flex h-full w-screen items-start justify-center !bg-none bg-cover bg-no-repeat md:h-screen md:items-center md:!bg-[url('https://images.unsplash.com/photo-1686164439898-9790e48910ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2040&q=80')]"
      }
    >
      <Card className={"w-full !shadow-none md:w-96 md:!shadow-md"}>
        <CardHeader
          className={
            "flex h-36 flex-col items-start justify-center bg-cover bg-center bg-no-repeat md:h-24 md:!bg-none"
          }
          bgImage={
            "url(https://images.unsplash.com/photo-1686164439898-9790e48910ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2040&q=80)"
          }
        >
          <h1 className={"text-2xl font-bold text-white md:text-black"}>
            登录
          </h1>
          {/*  描述*/}
          <p className={"mt-2 text-sm text-white md:text-black"}>
            请使用您的用户名和密码登录
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={!!formik.errors.username && formik.touched.username}
            >
              <FormLabel>用户名</FormLabel>
              <Input
                {...formik.getFieldProps("username")}
                placeholder={"用户名"}
              />
              {formik.errors.username && formik.touched.username ? (
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              ) : (
                <div className={"h-7"}></div>
              )}
            </FormControl>

            <FormControl
              className={"mt-2"}
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormLabel>密码</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  placeholder={"密码"}
                />
                <InputRightElement>
                  {showPassword ? (
                    <ViewOffIcon
                      onClick={toggleShowPassword}
                      className={"cursor-pointer"}
                    />
                  ) : (
                    <ViewIcon
                      onClick={toggleShowPassword}
                      className={"cursor-pointer"}
                    />
                  )}
                </InputRightElement>
              </InputGroup>

              {formik.errors.password && formik.touched.password ? (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              ) : (
                <div className={"h-7"}></div>
              )}
            </FormControl>
            <div className={"mt-2 flex items-center justify-between"}>
              {/* 注册和忘记密码 */}
              <a href={"/register"} className={"text-sm text-blue-500"}>
                注册
              </a>
              <a href={"/forget"} className={"text-sm text-blue-500"}>
                忘记密码
              </a>
            </div>
            <Button
              type={"submit"}
              isLoading={formik.isSubmitting}
              className={"mt-2 w-full"}
              spinner={<BeatLoader size={8} color="green" />}
            >
              登录
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
