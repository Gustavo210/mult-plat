import { Container } from "@mobilestockweb/container";
import { Spacer } from "@mobilestockweb/spacer";

import { useMultipleArchive } from "../../hooks/useMultipleArchive";
import { ErrorLabel } from "../ErrorLabel";
import { HelpButton } from "../HelpButton";
import { HelpText } from "../HelpText";
import { Title } from "../Title";

export function DefaultView() {
  const MultipleArchive = useMultipleArchive();
  return (
    <Container.Vertical align="CENTER">
      <Title />
      <Spacer size="2XS" />
      <HelpButton />
      <ErrorLabel />
      {MultipleArchive.accept?.includes("all") ? null : <HelpText />}
    </Container.Vertical>
  );
}
