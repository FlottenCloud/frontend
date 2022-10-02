import create from "zustand";

interface T {
  status: boolean;

  setStatus: (status: boolean) => void;

  getStatus: () => boolean;
}

const useStatusStore = create<T>((set: any, get: any) => ({
  status: true,

  setStatus: (status) => set({ status }),

  getStatus: () => get().status,
}));

export default useStatusStore;
