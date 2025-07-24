import styled, { css } from "styled-components/native";

import tools from "@mobilestock-native/tools";
import { Typography } from "@mobilestock-native/typography";

import { ButtonProps } from "../Button";

type NotificationBadgeProps = Pick<
  ButtonProps,
  "notification" | "notificationPosition" | "size"
>;

export function NotificationBadge(props: NotificationBadgeProps) {
  return (
    <NotificationBadgeComponent
      $position={props.notificationPosition}
      $size={props.size}
    >
      <NotificationText size={props.size} weight="BOLD">
        {props.notification > 99 ? "99+" : props.notification}
      </NotificationText>
    </NotificationBadgeComponent>
  );
}

const positionOffsets = {
  XS: { top: "-8px", right: "-10px" },
  SM: { top: "-10px", right: "-8px" },
  MD: { top: "-10px", right: "-8px" },
  LG: { top: "-12px", right: "-8px" },
  XL: { top: "-16px", right: "-10px" },
  "2XL": { top: "-16px", right: "-10px" },
  "3XL": { top: "-18px", right: "-10px" },
};

const NotificationBadgeComponent = styled.View<{
  $position: NotificationBadgeProps["notificationPosition"];
  $size: NotificationBadgeProps["size"];
}>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.alert.urgent};
  padding: 2px 4px;
  border-radius: 5px;

  ${({ $position, $size }) => {
    if ($position === "END") {
      return css`
        position: static;
      `;
    }

    const offset = positionOffsets[$size];

    return css`
      top: ${offset.top};
      right: ${offset.right};
    `;
  }}
`;

const NotificationText = styled(Typography)`
  color: ${({ theme }) => tools.defineTextColor(theme.colors.alert.urgent)};
`;
