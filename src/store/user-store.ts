import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  token?: string;
  setToken: (token: string) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token: string) => set({ token }),
    }),
    { name: "user-storage" }
  )
);
export default useUserStore;
