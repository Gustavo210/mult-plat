import { Container } from "@mobilestock-native/container";
import { useCounter } from "../../hooks/useCount";
import { Button } from "../Button";
import { ContainerPill } from "../ContainerPiil";
import { Display } from "../Display";
import { Error } from "../Error";
import { Label } from "../Label";

export function DefaultView() {
  const { label, labelPosition, error } = useCounter();
  return (
    <Container.Vertical align="CENTER_START">
      {labelPosition === "TOP_START" && label && (
        <Container.Horizontal gap="XS">
          <Label>{label}</Label>
          {error && <Error>{error}</Error>}
        </Container.Horizontal>
      )}
      {labelPosition !== "LEFT" && (
        <Container.Vertical align="CENTER">
          {labelPosition === "TOP_CENTER" && label && <Label>{label}</Label>}
          {error && <Error>{error}</Error>}
          <ContainerPill>
            <Button type="MINUS" />
            <Display />
            <Button type="PLUS" />
          </ContainerPill>
        </Container.Vertical>
      )}
      {labelPosition === "LEFT" && (
        <Container.Vertical>
          <Container.Horizontal gap="XS" align="CENTER">
            <Container.Vertical>
              {label && <Label>{label}</Label>}
              {error && <Error>{error}</Error>}
            </Container.Vertical>
            <ContainerPill>
              <Button type="MINUS" />
              <Display />
              <Button type="PLUS" />
            </ContainerPill>
          </Container.Horizontal>
        </Container.Vertical>
      )}
    </Container.Vertical>
  );
}
