import EmailForm from "@/components/custom/EmailForm";
import PasswordForm from "@/components/custom/PasswordForm";
import ProfileForm from "@/components/custom/ProfileForm";
import UsernameForm from "@/components/custom/UsernameForm";

const Settings = () => {
  return (
    <div className="flex flex-col gap-6 my-5 mx-4 w-full h-screen">
      <UsernameForm />
      <EmailForm />
      <PasswordForm />
      <ProfileForm />
    </div>
  );
};

export default Settings;
