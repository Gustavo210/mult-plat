import { ReactNode, useEffect } from "react";
import { useHeader } from "./useHeader";

export function useSubHeader(content: ReactNode) {
  const { setSubHeader } = useHeader();

  useEffect(() => {
    setSubHeader(content);

    return () => {
      setSubHeader(undefined);
    };
  }, [setSubHeader]);
}
