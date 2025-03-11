import AuthService from "@/services/auth.service";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await AuthService.validateSession();

  if (user) return redirect("/");

  return <>{children}</>;
};

export default layout;
