import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("用户名不能为空")
    .max(12, "用户名不能超过12个字符"),
  password: Yup.string()
    .required("密码不能为空")
    .max(16, "密码不能超过16个字符"),
});
const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: loginSchema,
  });

  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <div className={"w-11/12 lg:w-1/3"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.username && formik.touched.username}
          >
            <FormLabel htmlFor={"username"}>用户名</FormLabel>
            <Input
              {...formik.getFieldProps("username")}
              id={"username"}
              placeholder={"用户名"}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl
            className={"mt-4"}
            isInvalid={!!formik.errors.password && formik.touched.password}
          >
            <FormLabel htmlFor={"password"}>密码</FormLabel>
            <Input
              {...formik.getFieldProps("password")}
              id={"password"}
              placeholder={"密码"}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            disabled={formik.isSubmitting}
            onClick={formik.submitForm}
            className={"mt-4 w-full"}
          >
            登录
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
