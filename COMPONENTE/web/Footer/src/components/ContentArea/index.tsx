import { Container, ViewBaseProps } from "@mobilestockweb/container";
import styled from "styled-components";

export function ContentArea({ children, ...rest }: ViewBaseProps) {
  return (
    <ContentMain>
      <Container.Vertical full {...rest}>
        {children}
      </Container.Vertical>
    </ContentMain>
  );
}

const ContentMain = styled(Container)`
  padding: 0px 4px 12px 4px;
`;
