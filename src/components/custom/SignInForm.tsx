"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/validators/auth.validators";
import { UserLoginDto } from "@/lib/dtos/auth.dto";
import { InputType } from "@/lib/types/form";
import { signIn } from "@/actions/auth.actions";
import Form from "./Form";

const SignInForm = () => {
  const FIELDS: InputType[] = [
    {
      id: 3,
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      name: "username",
    },
    {
      id: 4,
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      name: "password",
    },
  ];
  const form = useForm<UserLoginDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  }); //await signIn(values);

  return (
    <Form submitText="Sign In" form={form} callBack={signIn} fields={FIELDS} />
  );
};

export default SignInForm;
