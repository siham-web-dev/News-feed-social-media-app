"use client";
import {
  checkAndSendOTPEmail,
  checkOTPAndUpdateEmail,
} from "@/actions/user.actions";
import Form from "./Form";
import SettingForm from "./SettingForm";
import { InputType } from "@/lib/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema, OTPSchema } from "@/lib/validators/user.validators";

const EmailForm = () => {
  const EMAIL_FORM_FIELDS: InputType[] = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      id: 1,
      name: "email",
    },
  ];

  const OTP_FORM_FIELDS: InputType[] = [
    {
      label: "OTP",
      type: "text",
      placeholder: "Enter your OTP",
      id: 2,
      name: "otpCode",
    },
  ];

  const formEmail = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const formOTP = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  return (
    <SettingForm title="Update email" id="email">
      <Form
        submitText="Send OTP"
        callBack={checkAndSendOTPEmail}
        fields={EMAIL_FORM_FIELDS}
        form={formEmail}
        width="fit"
      />
      <Form
        submitText="Check OTP and save"
        callBack={checkOTPAndUpdateEmail}
        fields={OTP_FORM_FIELDS}
        form={formOTP}
        width="fit"
      />
    </SettingForm>
  );
};

export default EmailForm;
