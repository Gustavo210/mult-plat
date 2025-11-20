import { Container } from "@mobilestock-native/container";
import { Spacer } from "@mobilestock-native/spacer";

import { Platform } from "react-native";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";
import { HelpButton } from "../HelpButton";
import { HelpText } from "../HelpText";
import { Title } from "../Title";

export function DefaultView() {
  const MultipleArchive = useMultipleArchive();
  return (
    <Container.Vertical align="CENTER">
      {Platform.OS === "web" ? <Title /> : null}
      <Spacer size="2XS" />
      <HelpButton />
      {MultipleArchive.accept?.includes("all") ? null : <HelpText />}
    </Container.Vertical>
  );
}
