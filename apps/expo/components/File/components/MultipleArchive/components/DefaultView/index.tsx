import { Container } from "@mobilestock-native/container";
import { Title } from "../Title";
import { Spacer } from "@mobilestock-native/spacer";
import { HelpButton } from "../HelpButton";
import { HelpText } from "../HelpText";
import { Footer } from "../Footer";
import { useFileInput } from "../../../../hooks/useFile";

export function DefaultView() {
  const FileInput = useFileInput();
  return (
    <>
      <Container.Vertical align="CENTER">
        <Title />
        <Spacer size="2XS" />
        <HelpButton />
        {FileInput.accept?.includes("all") ? null : <HelpText />}
      </Container.Vertical>
      <Footer />
    </>
  );
}
