import create from "zustand";

export const MUTATION_STATUS = {
  DEFAULT: "DEFAULT",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;
type MUTATION_STATUS = typeof MUTATION_STATUS[keyof typeof MUTATION_STATUS];

interface T {
  status: MUTATION_STATUS;
  message: string;

  setStatus: (status: MUTATION_STATUS) => void;
  setMessage: (message: string) => void;

  getStatus: () => MUTATION_STATUS;
  getMessage: () => string;
}

const usePostModalStore = create<T>((set: any, get: any) => ({
  status: MUTATION_STATUS.DEFAULT,
  message: "",
  successCallback: undefined,

  setStatus: (status) => set({ status }),
  setMessage: (message) => set({ message }),

  getStatus: () => get().status,
  getMessage: () => get().message,
}));

export default usePostModalStore;
