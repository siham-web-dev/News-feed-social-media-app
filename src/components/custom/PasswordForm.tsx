"use client";
import { updatePassword } from "@/actions/user.actions";
import Form from "./Form";
import SettingForm from "./SettingForm";
import { InputType } from "@/lib/types/form";
import { UpdatePasswordDto } from "@/lib/dtos/user.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "@/lib/validators/user.validators";

const PasswordForm = () => {
  const form = useForm<UpdatePasswordDto>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmedNewPassword: "",
    },
  });
  const FIELDS: InputType[] = [
    {
      id: 1,
      label: "Current password",
      type: "password",
      placeholder: "Enter your current password",
      name: "oldPassword",
    },
    {
      id: 2,
      label: "New password",
      type: "password",
      placeholder: "Enter your new password",
      name: "newPassword",
    },
    {
      id: 3,
      label: "Confirm new password",
      type: "password",
      placeholder: "Confirm your new password",
      name: "confirmedNewPassword",
    },
  ];
  return (
    <SettingForm id="profile" title="Update your password">
      <Form
        width="fit"
        callBack={updatePassword}
        form={form}
        fields={FIELDS}
        submitText="Submit"
      />
    </SettingForm>
  );
};

export default PasswordForm;
