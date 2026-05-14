"use server";

import { deleteCookie } from "@/lib/cookieUtils";
import { getUserInfo } from "@/services/auth.services";

export const checkAuth = async () => {
  const userInfo = await getUserInfo();
  return {
    isAuthenticated: !!userInfo,
    user: userInfo,
  };
};

export const logoutAction = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("better-auth.session_token");
};