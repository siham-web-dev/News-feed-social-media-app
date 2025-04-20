"use client";
import { useForm } from "react-hook-form";
import Form from "./Form";
import { UpdateProfileDto } from "@/lib/dtos/user.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/validators/user.validators";
import { updateProfile } from "@/actions/user.actions";
import { useSession } from "./SessionProvider";
import { InputType } from "@/lib/types/form";
import SettingForm from "./SettingForm";

const ProfileForm = () => {
  const { user } = useSession();
  const form = useForm<UpdateProfileDto>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      bio: user?.profile.bio || "",
      displayName: user?.profile.displayName || "",
    },
  });
  const FIELDS: InputType[] = [
    {
      id: 1,
      label: "Display name",
      type: "text",
      placeholder: "Enter your display name",
      name: "displayName",
    },
    {
      id: 2,
      label: "Bio",
      type: "text",
      placeholder: "Enter your bio",
      name: "bio",
    },
  ];
  return (
    <SettingForm id="profile" title="Update your profile">
      <Form
        width="fit"
        callBack={updateProfile}
        form={form}
        fields={FIELDS}
        submitText="Submit"
      />
    </SettingForm>
  );
};

export default ProfileForm;
