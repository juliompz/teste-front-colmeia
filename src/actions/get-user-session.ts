"use server";
import { cookies } from "next/headers";

const getUserSession = async () => {
  const cook = await cookies();
  const userSession = cook.get("user_session")?.value;
  return userSession;
};

export { getUserSession };
