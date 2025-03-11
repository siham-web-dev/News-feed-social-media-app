import AuthContent from "@/components/custom/AuthContent";
import SignInForm from "@/components/custom/SignInForm";

const page = () => {
  return (
    <AuthContent type="LOGIN">
      <SignInForm />
    </AuthContent>
  );
};

export default page;
