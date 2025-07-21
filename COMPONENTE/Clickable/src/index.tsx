import { Pressable, PressableProps } from "react-native";
import styled from "styled-components/native";

import LoadingSpinner from "@mobilestock-native/loading-spinner";
import { useMemo } from "react";

export interface ClickableProps extends PressableProps {
  isLoading?: boolean;
}

function ChildContent({ disabled, isLoading, children }: ClickableProps) {
  return useMemo(() => {
    const resolvedChildren =
      typeof children === "function"
        ? children({ pressed: false, hovered: false })
        : children;
    return (
      <>
        <ContentWrapper $disabled={disabled || isLoading}>
          {resolvedChildren}
        </ContentWrapper>
        {isLoading && (
          <LoadingOverlay>
            <TransparentLoadingSpinner />
          </LoadingOverlay>
        )}
      </>
    );
  }, [disabled, isLoading, children]);
}

export function Clickable({
  disabled,
  isLoading,
  children,
  ...props
}: ClickableProps) {
  return useMemo(() => {
    return (
      <Pressable {...props} disabled={disabled || isLoading}>
        <ChildContent disabled={disabled} isLoading={isLoading}>
          {children}
        </ChildContent>
      </Pressable>
    );
  }, [disabled, isLoading, children, props]);
}

const ContentWrapper = styled.View<{ $disabled: ClickableProps["disabled"] }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
`;

const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TransparentLoadingSpinner = styled(LoadingSpinner)`
  background-color: transparent;
`;
