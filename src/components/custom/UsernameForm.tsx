"use client";
import { InputType } from "@/lib/types/form";
import Form from "./Form";
import SettingForm from "./SettingForm";
import { useForm } from "react-hook-form";
import { useSession } from "./SessionProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsernameSchema } from "@/lib/validators/user.validators";
import { updateUsername } from "@/actions/user.actions";

const UsernameForm = () => {
  const FIELDS: InputType[] = [
    {
      id: 1,
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      name: "username",
    },
  ];
  const { user } = useSession();
  const form = useForm({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: user?.username || "",
    },
  });

  return (
    <SettingForm id="username" title="Update your username">
      <Form
        fields={FIELDS}
        callBack={updateUsername}
        submitText="Submit"
        form={form}
        width="fit"
      />
    </SettingForm>
  );
};

export default UsernameForm;
