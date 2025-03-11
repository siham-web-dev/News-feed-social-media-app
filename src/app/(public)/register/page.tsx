import AuthContent from "@/components/custom/AuthContent";
import SignUpForm from "@/components/custom/SignUpForm";

const page = () => {
  return (
    <AuthContent type="REGISTER">
      <SignUpForm />
    </AuthContent>
  );
};

export default page;
