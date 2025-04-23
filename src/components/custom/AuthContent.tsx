import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import GoogleSignInBtn from "./GoogleSignInBtn";

type AuthContentProps = {
  children: React.ReactNode;
  type: "LOGIN" | "REGISTER";
};

const AuthContent: React.FC<AuthContentProps> = ({ children, type }) => {
  return (
    <div className="mb-6 max-w-[300px] sm:max-w-[400px] mx-auto flex flex-col mt-16 justify-center items-center gap-3">
      <div className="rounded-2xl p-5 flex flex-col justify-center items-center  bg-white border border-foreground text-black gap-5">
        <Logo hidden={false} />
        <p className="text-center text-accent-foreground text-sm">
          Stay informed with real-time news, trending stories, and live updates.
        </p>
        <GoogleSignInBtn type={type} />
        {children}
      </div>
      <div className="rounded-2xl p-5  bg-white border border-foreground text-black gap-3 w-full">
        <p>
          {type === "LOGIN" ? "You don't have account ?" : "You have account ?"}
          <Link
            href={type === "LOGIN" ? "/register" : "/login"}
            className="text-primary text-sm"
          >
            {type === "LOGIN" ? " Sign Up" : " Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
