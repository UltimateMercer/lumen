import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  accessLevel: "public" | "government";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (username: string, password: string) => void;
  loginGovernment: (username: string, password: string) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      login: (username: string, password: string) => {
        const userData: User = { username, accessLevel: "public" };
        set({ user: userData, isAuthenticated: true });
      },
      loginGovernment: (username: string, password: string) => {
        const userData: User = { username, accessLevel: "government" };
        set({ user: userData, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
