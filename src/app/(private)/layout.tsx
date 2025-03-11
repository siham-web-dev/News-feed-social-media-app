import React from "react";
import SessionProvider from "@/components/custom/SessionProvider";
import { redirect } from "next/navigation";
import AuthService from "@/services/auth.service";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await AuthService.validateSession();
  const s = JSON.parse(JSON.stringify(session));

  if (!s.user) return redirect("/login");

  return <SessionProvider value={s}>{children}</SessionProvider>;
};

export default layout;
