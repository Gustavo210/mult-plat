import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";

import { LoadingSpinner } from "@mobilestockweb/loading-spinner";
import tools from "@mobilestockweb/tools";

export interface ClickableProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Clickable = forwardRef(function Clickable(
  { disabled, isLoading, children, ...props }: ClickableProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const internalRef = useRef<HTMLButtonElement>(null);
  const [iconColor, setIconColor] = useState<string>("");

  useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement);

  useEffect(() => {
    if (internalRef?.current) {
      const computedStyle = getComputedStyle(internalRef.current);

      const color = tools.defineTextColor(computedStyle.backgroundColor);
      setIconColor(color);
    }
  }, []);

  return (
    <ClickableComponent
      ref={internalRef}
      {...props}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
    >
      <ContentWrapper $isLoading={isLoading}>{children}</ContentWrapper>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner color={iconColor} />
        </LoadingOverlay>
      )}
    </ClickableComponent>
  );
});

const ClickableComponent = styled.button<{
  $isLoading: ClickableProps["isLoading"];
}>`
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    ${({ $isLoading }) =>
      $isLoading &&
      css`
        cursor: wait;
      `}
  }
`;

const ContentWrapper = styled.div<{ $isLoading: ClickableProps["isLoading"] }>`
  display: contents;
  width: 100%;
  height: 100%;
  visibility: ${({ $isLoading }) => ($isLoading ? "hidden" : "visible")};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
