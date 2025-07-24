import { useState } from "react";
import {
  ColorValue,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import styled, { css } from "styled-components/native";

import { LoadingSpinner } from "@mobilestock-native/loading-spinner";
import tools from "@mobilestock-native/tools";

export interface ClickableProps extends PressableProps {
  isLoading?: boolean;
}

export function Clickable({
  disabled,
  isLoading,
  children,
  ...props
}: ClickableProps) {
  const [iconColor, setIconColor] = useState<ColorValue>("");

  function changeIconColor(styleState: StyleProp<ViewStyle>) {
    if (
      typeof styleState === "object" &&
      !!styleState &&
      "backgroundColor" in styleState &&
      typeof styleState.backgroundColor === "string"
    ) {
      const color = tools.defineTextColor(styleState.backgroundColor);
      setIconColor(color);
    } else {
      setIconColor("");
    }
  }

  return (
    <Pressable
      {...props}
      style={({ pressed }) => {
        let currentStyle = props.style;

        if (typeof currentStyle === "function") {
          currentStyle = currentStyle({ pressed });
        }

        if (Array.isArray(currentStyle)) {
          const findStyleData = currentStyle.findLast(
            (styleArray) => styleArray && "backgroundColor" in styleArray
          );
          changeIconColor(findStyleData as StyleProp<ViewStyle>);
          return currentStyle;
        }

        changeIconColor(currentStyle);
        return currentStyle;
      }}
      disabled={disabled || isLoading}
    >
      {(state: PressableStateCallbackType) => (
        <>
          <ContentWrapper $disabled={disabled} $isLoading={isLoading}>
            {typeof children === "function" ? children(state) : children}
          </ContentWrapper>
          {isLoading && (
            <LoadingOverlay>
              <TransparentLoadingSpinner color={iconColor} />
            </LoadingOverlay>
          )}
        </>
      )}
    </Pressable>
  );
}

const ContentWrapper = styled.View<{
  $disabled: ClickableProps["disabled"];
  $isLoading: ClickableProps["isLoading"];
}>`
  ${({ $isLoading, $disabled }) => {
    if ($isLoading) {
      return css`
        opacity: 0;
      `;
    }

    if ($disabled) {
      return css`
        opacity: 0.3;
      `;
    }

    return "";
  }};
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
