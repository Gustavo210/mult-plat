import styled from "styled-components";
import { useFooterContext } from "../../../footerContext";

export function AntiFooter() {
  const { setFooterHeight, footerHeight } = useFooterContext();

  return <AntiFooterContainer $height={footerHeight} />;
}

export const AntiFooterContainer = styled.div<{
  $height: number;
}>`
  width: 100%;
  height: ${({ $height }) => `${$height || 0}px`};
`;
