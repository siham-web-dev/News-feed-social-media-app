"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/validators/auth.validators";
import { UserRegistrationDto } from "@/lib/dtos/auth.dto";
import { InputType } from "@/lib/types/form";
import { signUp } from "@/actions/auth.actions";
import Form from "./Form";

const SignUpForm = () => {
  const FIELDS: InputType[] = [
    {
      id: 1,
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      name: "displayName",
    },
    {
      id: 2,
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      name: "email",
    },
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
  const form = useForm<UserRegistrationDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      displayName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form callBack={signUp} form={form} fields={FIELDS} submitText="Sign Up" />
  );
};

export default SignUpForm;
