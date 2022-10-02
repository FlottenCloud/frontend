import create from "zustand";

interface T {
  url: string;

  setUrl: (url: string) => void;

  getUrl: () => string;
}

const useConsoleStore = create<T>((set: any, get: any) => ({
  url: "",

  setUrl: (url) => set({ url }),

  getUrl: () => get().url,
}));

export default useConsoleStore;
