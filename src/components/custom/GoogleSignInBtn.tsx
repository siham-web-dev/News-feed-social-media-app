/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { googleSignIn, googleSignUp } from "@/actions/auth.actions";
import useMessages from "@/lib/hooks/useMessages";

const GoogleSignInBtn = ({ type }: { type: "LOGIN" | "REGISTER" }) => {
  const provider = new GoogleAuthProvider();
  const { showMessage } = useMessages();

  const onConnect = async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      const email = res.user.email;
      const displayName = res.user.displayName;
      const avatarUrl = res.user.photoURL;
      const googleId = res.user.uid;
      const result =
        type === "REGISTER"
          ? await googleSignUp({
              email: email as string,
              displayName: displayName as string,
              avatarUrl: avatarUrl as string,
              googleId: googleId as string,
            })
          : await googleSignIn({
              googleId: googleId as string,
            });

      if (result?.error) {
        showMessage(result.error, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={onConnect} className="w-full" variant={"destructive"}>
      <FaGoogle />
      Connect with Google
    </Button>
  );
};

export default GoogleSignInBtn;
