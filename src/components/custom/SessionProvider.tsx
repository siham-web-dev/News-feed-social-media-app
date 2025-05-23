"use client";
import { Session, User } from "lucia";
import React from "react";

interface AuthSession {
  user:
    | (User & {
        username: string;
        profile: {
          displayName: string;
          avatarUrl: string;
          bio: string | null;
        };
      })
    | null;
  session: Session | null;
}

type SessionProviderProps = {
  value: AuthSession;
  children: React.ReactNode;
};

const context = React.createContext<AuthSession | null>(null);

const SessionProvider: React.FC<SessionProviderProps> = ({
  value,
  children,
}) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default SessionProvider;

export const useSession = () => {
  const sessionContext = React.useContext(context);
  if (!sessionContext) {
    throw Error("the session is null");
  }
  return sessionContext;
};
