"use client";
"use client";
import React, { useTransition } from "react";
import { Form } from "../ui/form";
import CustomFormField from "./FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/validators/auth.validators";
import { UserLoginDto } from "@/lib/dtos/auth.dto";
import SubmitButton from "./SubmitButton";
import { InputType } from "@/lib/types/form";
import { signIn } from "@/controllers/auth.controller";
import useMessages from "@/lib/hooks/useMessages";

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
  });
  const [isPending, startTransition] = useTransition();
  const { showMessage } = useMessages();

  const onSubmit = (values: UserLoginDto) => {
    startTransition(async () => {
      const { error } = await signIn(values);
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
          text={isPending ? "Sign In..." : "Sign In"}
        />
      </form>
    </Form>
  );
};

export default SignInForm;
