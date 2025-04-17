"use server";

import { HUMANIZED_MESSAGES } from "@/lib/constants";
import AuthService from "@/services/auth.service";
import { LikeService } from "@/services/like.service";

const likeService = new LikeService();

export const isLikedByCurrentUser = async ({
  postUuid,
}: {
  postUuid: string;
}) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isLikedBy = await likeService.isLikedBy({
      postUuid,
      userUuid: user.id,
    });

    return { isLikedBy };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const getLikes = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const likes = await likeService.getLikes(postUuid);

    return { likes };
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const likePost = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await likeService.like({
      postUuid,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};

export const unLikePost = async ({ postUuid }: { postUuid: string }) => {
  try {
    const { user } = await AuthService.validateSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await likeService.unlike({
      postUuid,
      userUuid: user.id,
    });
  } catch (error) {
    console.error(error);

    return { error: HUMANIZED_MESSAGES.ERROR.INTERNAL_SERVER_ERR };
  }
};
