import styled, { css } from "styled-components/native";

import { Typography } from "@mobilestock-native/typography";
import tools from "../../../../Tools/src";

import { calculateBackgroundColor } from "../../utils";
import { ButtonProps, RelativeContainer } from "../Button";
import { NotificationBadge } from "../NotificationBadge";

interface TextContainerProps
  extends Pick<
    ButtonProps,
    | "text"
    | "fontWeight"
    | "size"
    | "notification"
    | "notificationPosition"
    | "variant"
    | "backgroundColor"
  > {
  withUnderline?: boolean;
  color?: string;
}

export function TextContainer(props: TextContainerProps) {
  if (!props.text) return null;

  const shouldShowNotification =
    props.notification && props.notificationPosition === "TEXT";

  if (shouldShowNotification) {
    return (
      <RelativeContainer>
        <ButtonText
          $color={props.color}
          $backgroundColor={props.backgroundColor}
          $variant={props.variant}
          weight={props.fontWeight}
          size={props.size}
          withUnderline={props.withUnderline}
        >
          {props.text}
        </ButtonText>
        <NotificationBadge
          notification={props.notification}
          notificationPosition={props.notificationPosition}
          size={props.size}
        />
      </RelativeContainer>
    );
  }

  return (
    <ButtonText
      $color={props.color}
      $backgroundColor={props.backgroundColor}
      $variant={props.variant}
      weight={props.fontWeight}
      size={props.size}
      withUnderline={props.withUnderline}
    >
      {props.text}
    </ButtonText>
  );
}

const ButtonText = styled(Typography)<{
  $color: TextContainerProps["color"];
  $variant: TextContainerProps["variant"];
  $backgroundColor: TextContainerProps["backgroundColor"];
}>`
  ${({ $variant, $backgroundColor, $color, theme }) => {
    const backgroundColorWithLuminosity = calculateBackgroundColor(
      $backgroundColor,
      theme
    );

    if ($color) {
      return css`
        color: ${$color};
      `;
    }

    switch ($variant) {
      case "DEFAULT":
        return css`
          color: ${tools.defineTextColor(backgroundColorWithLuminosity)};
        `;
      case "TRANSPARENT":
      case "OUTLINE":
        return css`
          color: ${backgroundColorWithLuminosity};
        `;
      case "LINK":
        return css`
          color: ${theme.colors.text.default};
        `;
    }
  }}
`;
