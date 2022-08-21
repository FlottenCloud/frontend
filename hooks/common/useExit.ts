import { useEffect } from "react";

interface useExitProps {
  callback: any;
  dependencies?: Array<any>;
}

const useExit = ({ callback, dependencies = [] }: useExitProps) => {
  useEffect(() => {
    return () => callback();
  }, [callback, ...dependencies]);
};

export default useExit;
