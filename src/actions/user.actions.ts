"use server";
import UserService from "@/services/user.service";

const userService = new UserService();

export const getUserProfileInfoByUserUuid = async (userId: string) => {
  return await userService.getUserProfileInfoByUserUuid(userId);
};

export const getUserStatisticsByUserUuid = async (userId: string) => {
  return await userService.getUserStatistics(userId);
};
