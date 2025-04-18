import EmailForm from "@/components/custom/EmailForm";
import PasswordForm from "@/components/custom/PasswordForm";
import ProfileForm from "@/components/custom/ProfileForm";

const Settings = () => {
  return (
    <div>
      <ProfileForm />
      <EmailForm />
      <PasswordForm />
    </div>
  );
};

export default Settings;
