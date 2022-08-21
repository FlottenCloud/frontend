import { useEffect } from "react";

const useEscape = (handler: (close: boolean) => void) => {
  useEffect(() => {
    const escape = (e) => {
      e.code === "Escape" && handler(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [handler]);
};

export default useEscape;
