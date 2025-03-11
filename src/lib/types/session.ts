import { Session as LuciaSession, User as LuciaUser } from "lucia";

export type SessionValidation = Promise<
  { user: LuciaUser; session: LuciaSession } | { user: null; session: null }
>;
