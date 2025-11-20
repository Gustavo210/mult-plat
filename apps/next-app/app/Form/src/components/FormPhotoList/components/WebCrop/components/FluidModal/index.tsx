import { useCallback, useEffect, useState } from "react";
import Modal, { Props } from "react-modal";
import { UAParser } from "ua-parser-js";

export function FluidModal({ children, ...props }: Props) {
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
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            margin: 0,
            borderRadius: 0,
            border: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: viewportHeight ? `${viewportHeight}px` : "100vh",
            maxHeight: viewportHeight ? `${viewportHeight}px` : "100vh",
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
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          padding: 0,
          margin: 0,
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      {children}
    </Modal>
  );
}
