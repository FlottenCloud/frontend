import create from "zustand";

interface T {
  status: string;

  setStatus: (status: string) => void;

  getStatus: () => string;
}

const useStatusStore = create<T>((set: any, get: any) => ({
  status: "openstack",

  setStatus: (status) => set({ status }),

  getStatus: () => get().status,
}));

export default useStatusStore;
