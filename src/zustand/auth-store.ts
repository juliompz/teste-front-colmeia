// stores/auth-store.ts
import { IUser } from "@/@types/IUser";
import { logout } from "@/actions/logout";
import { setUserSession } from "@/actions/set-user-session";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  users_list: IUser[];
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users_list: [],
      user: null,
      login: async (email, password) => {
        const users = get().users_list;

        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (!foundUser) {
          throw new Error("Usuário ou senha inválidos");
        }
        set({ user: foundUser });
        setUserSession(foundUser);
      },

      register: async (name, email, password) => {
        const users = get().users_list;
        if (users.find((user) => user.email === email)) {
          throw new Error("E-mail já cadastrado!");
        }
        set({
          users_list: [
            ...users,
            { id: Math.ceil(Math.random() * 10), name, email, password },
          ],
        });
      },
      logout: () => {
        set({ user: null });
        logout();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
