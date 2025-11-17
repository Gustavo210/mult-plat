import { Container } from "@mobilestock-native/container";
import { Spacer } from "@mobilestock-native/spacer";
import { DropController } from "./components/DropController";
import { Footer } from "./components/Footer";
import { HelpButton } from "./components/HelpButton";
import { HelpText } from "./components/HelpText";
import { Title } from "./components/Title";
import { FileInputProvider } from "../../hooks/useFile";

export function MultipleArchive({ children }: { children?: React.ReactNode }) {
  return (
    <FileInputProvider>
      <Container.Vertical
        style={{
          borderWidth: 1,
          backgroundColor: "#f9f9f9",
          borderColor: "#cecece",
          borderRadius: 8,
          maxWidth: 400,
        }}
        padding="MD"
      >
        <DropController>
          {children || (
            <>
              <Container.Vertical align="CENTER">
                <Title />
                <Spacer size="2XS" />
                <HelpButton />
                <HelpText />
              </Container.Vertical>
              <Footer />
            </>
          )}
        </DropController>
      </Container.Vertical>
    </FileInputProvider>
  );
}
