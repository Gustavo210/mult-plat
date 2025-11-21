import { useCallback, useEffect, useState } from "react";
import Modal, { Props } from "react-modal";
import { useTheme } from "styled-components";
import { UAParser } from "ua-parser-js";

export function FluidModal({ children, ...props }: Props) {
  const Theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(
    undefined
  );

  const handleVerifyIsMobile = useCallback(() => {
    return (
      UAParser(window.navigator.userAgent).device.type === "mobile" ||
      window.innerWidth <= 768
    );
  }, []);

  const handleResize = useCallback(() => {
    setIsMobile(handleVerifyIsMobile());
    setViewportHeight(window.innerHeight);
  }, [handleVerifyIsMobile]);

  useEffect(() => {
    setIsMobile(handleVerifyIsMobile());
    setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleVerifyIsMobile, handleResize]);

  if (isMobile) {
    return (
      <Modal
        style={{
          content: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            margin: 0,
            borderRadius: 0,
            border: "none",
            height: viewportHeight ? `${viewportHeight}px` : "100vh",
            maxHeight: viewportHeight ? `${viewportHeight}px` : "100vh",
            boxSizing: "border-box",
          },
        }}
        {...props}
      >
        {children}
      </Modal>
    );
  }

  return (
    <Modal
      {...props}
      style={{
        overlay: {
          backgroundColor: Theme.colors.container.shadow,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          padding: 0,
          margin: 0,
          transform: "translate(-50%, -50%)",
          borderRadius: 8,
          border: "none",
          width: "min(900px, 100vw - 32px)",
          height: "min(700px, 100vh - 32px)",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
          boxSizing: "border-box",
        },
      }}
    >
      {children}
    </Modal>
  );
}
