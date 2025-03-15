"use client";
import React, { useTransition } from "react";
import { Form } from "../ui/form";
import CustomFormField from "./FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/validators/auth.validators";
import { UserRegistrationDto } from "@/lib/dtos/auth.dto";
import SubmitButton from "./SubmitButton";
import { InputType } from "@/lib/types/form";
import { signUp } from "@/actions/auth.actions";
import useMessages from "@/lib/hooks/useMessages";

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
  const [isPending, startTransition] = useTransition();
  const { showMessage } = useMessages();

  const onSubmit = (values: UserRegistrationDto) => {
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) {
        showMessage(error, "error");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full gap-3.5 flex flex-col"
        method="post"
      >
        {FIELDS.map((field) => (
          <div key={field.id}>
            <CustomFormField {...field} control={form.control} />
          </div>
        ))}
        <SubmitButton
          width="full"
          disabled={isPending}
          text={isPending ? "Registering ..." : "Sign Up"}
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
