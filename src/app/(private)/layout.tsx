import React from "react";
import SessionProvider from "@/components/custom/SessionProvider";
import { redirect } from "next/navigation";
import AuthService from "@/services/auth.service";
import SideBar from "@/components/custom/SideBar";
import NavBar from "@/components/custom/NavBar";
import BeamSetup from "@/components/custom/BeamSetup";
import NotificationListener from "@/components/custom/NotificationListener";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await AuthService.validateSession();
  const s = JSON.parse(JSON.stringify(session));

  if (!s.user) return redirect("/login");

  return (
    <SessionProvider value={s}>
      <main className="flex flex-col-reverse h-screen sm:flex-row gap-2.5 overflow-x-hidden">
        <SideBar />
        {children}
        <NavBar />
      </main>
      <BeamSetup />
      <NotificationListener />
    </SessionProvider>
  );
};

export default layout;
