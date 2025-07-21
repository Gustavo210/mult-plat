import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { FooterProvider, useFooterContext } from "../footerContext";
import { FloatArea } from "../src/components/FloatArea";
import { AntiFooter } from "./components/AntiFooter";

interface FooterProps {
  children?: React.ReactNode;
  fixed?: boolean;
  fillColor?: string;
  padding?: number;
  bottomSpace?: number;
}

export function FooterComponent({
  children,
  fixed = false,
  fillColor,
  padding = 0,
  bottomSpace,
}: FooterProps) {
  return (
    <FooterProvider>
      <FooterWithContext
        fixed={fixed}
        fillColor={fillColor}
        padding={padding}
        bottomSpace={bottomSpace}
      >
        {children}
      </FooterWithContext>
    </FooterProvider>
  );
}

function FooterWithContext({
  children,
  fixed,
  fillColor,
  padding,
  bottomSpace,
}: FooterProps) {
  const { setFooterHeight, footerHeight } = useFooterContext();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.offsetHeight;
      setFooterHeight(height);
    }
  }, [setFooterHeight]);

  const childrenArray = React.Children.toArray(children);

  const FloatAreas = childrenArray.filter(
    (child: any) => child.type === FloatArea
  );

  const regularChildren = childrenArray.filter(
    (child: any) => child.type !== FloatArea
  );

  return (
    <>
      <AntiFooter />

      {FloatAreas}

      <FooterContainer
        ref={footerRef}
        $fixed={!!fixed}
        $fillColor={fillColor}
        $padding={padding ?? 0}
        $bottomSpace={bottomSpace ?? padding ?? 0}
      >
        {regularChildren}
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.div<{
  $fixed: boolean;
  $fillColor?: string;
  $padding: number;
  $bottomSpace: number;
}>`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 1rem;
  padding: ${({ $padding }) => `${$padding}px`};
  padding-bottom: ${({ $bottomSpace }) => `${$bottomSpace}px`};
  background-color: ${({ $fillColor }) => $fillColor || "white"};
  display: flex;
  flex-direction: column;
  z-index: 10;
  left: 0px;
`;
