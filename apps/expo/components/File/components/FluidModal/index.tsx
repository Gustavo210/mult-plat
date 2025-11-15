import { Container } from "@mobilestock-native/container";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Modal, ModalProps } from "react-native";
import { UAParser } from "ua-parser-js";

export function FluidModal({ children, ...props }: ModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  const handleVerifyIsMobile = useCallback(() => {
    return (
      UAParser(window.navigator.userAgent).device.type === "mobile" ||
      window.innerWidth <= 768
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(handleVerifyIsMobile());
    };
    window.addEventListener("resize", handleResize);

    setIsMobile(handleVerifyIsMobile());
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleVerifyIsMobile]);

  if (isMobile) {
    return (
      <Modal transparent statusBarTranslucent {...props}>
        <Container.Main>{children}</Container.Main>
      </Modal>
    );
  }
  return (
    <Modal transparent statusBarTranslucent animationType="slide" {...props}>
      <Container.Vertical align="CENTER" full>
        <Container.Vertical
          full
          padding="MD"
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            maxWidth: Dimensions.get("window").width * 0.8,
            maxHeight: Dimensions.get("window").height * 0.8,
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Container.Vertical>
      </Container.Vertical>
    </Modal>
  );
}
