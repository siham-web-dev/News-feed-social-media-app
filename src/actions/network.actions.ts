"use server";

import AuthService from "@/services/auth.service";
import NetworkService from "@/services/network.service";

const networkService = new NetworkService();

export const getUsersSugesstions = async () => {
  const { user } = await AuthService.validateSession();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const sugesstions = await networkService.getSugesstions(user.id);

  return sugesstions;
};
