"use server";
import { IUser } from "@/@types/IUser";
import { cookies } from "next/headers";

const setUserSession = async (user: IUser) => {
  const cook = await cookies();
  const cookieValue = `${user.id}:${user.email}:session_active`;
  cook.set("user_session", cookieValue, {
    httpOnly: true,
  });
};

export { setUserSession };
