import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import styled, { css } from "styled-components/native";

import { LoadingSpinner, LoadingSpinnerProps } from "../../LoadingSpinner/src";
import tools from "../../Tools/src";

export interface ClickableProps extends PressableProps {
  isLoading?: boolean;
  size?: LoadingSpinnerProps["size"];
}

export function Clickable({
  disabled,
  isLoading,
  children,
  size,
  ...props
}: ClickableProps) {
  function getColorFromStyle(styleState: StyleProp<ViewStyle>) {
    if (
      typeof styleState === "object" &&
      !!styleState &&
      "backgroundColor" in styleState &&
      typeof styleState.backgroundColor === "string"
    ) {
      return tools.defineTextColor(styleState.backgroundColor);
    }
    return "";
  }

  return (
    <Pressable {...props} disabled={disabled || isLoading}>
      {(state: PressableStateCallbackType) => {
        let currentStyle = props.style;

        if (typeof currentStyle === "function") {
          currentStyle = currentStyle({ pressed: state.pressed });
        }

        let iconColor = getColorFromStyle(currentStyle);

        if (Array.isArray(currentStyle)) {
          const findStyleData = currentStyle.findLast(
            (styleArray) => styleArray && "backgroundColor" in styleArray
          );
          iconColor = getColorFromStyle(findStyleData as StyleProp<ViewStyle>);
        }

        return (
          <>
            <ContentWrapper $disabled={disabled} $isLoading={isLoading}>
              {typeof children === "function" ? children(state) : children}
            </ContentWrapper>
            {isLoading && (
              <LoadingOverlay>
                <TransparentLoadingSpinner size={size} color={iconColor} />
              </LoadingOverlay>
            )}
          </>
        );
      }}
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
