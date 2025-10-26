"use server";
import { cookies } from "next/headers";

const logout = async () => {
  const cook = await cookies();
  cook.delete("user_session");
};

export { logout };
