import { create } from "zustand";

interface SettingsState {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const useSettingsStore = create<SettingsState>()((set) => ({
  showSidebar: true,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
}));

export default useSettingsStore;
