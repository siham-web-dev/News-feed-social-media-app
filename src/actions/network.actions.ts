"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
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

export const isFollowedByCurrentUser = async ({
  userUuid,
}: {
  userUuid: string;
}) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isFollowedBy = await networkService.isFollowedBy({
      followingUuid: userUuid,
      userUuid: user.id,
    });

    return { isFollowedBy };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const follow = async ({ userUuid }: { userUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }
    console.log(userUuid === user.id);

    await networkService.follow({
      followingUuid: userUuid,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const unFollow = async ({ userUuid }: { userUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await networkService.unFollow({
      followingUuid: userUuid,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
