import { ActivityIndicator, ColorValue, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { IconSize } from "@mobilestock-native/icons";

interface LoadingSpinnerProps extends ViewProps {
  title?: string;
  size?: IconSize;
  color?: ColorValue;
}

export function LoadingSpinner({
  size = "MD",
  title,
  color,
  ...props
}: LoadingSpinnerProps) {
  const theme = useTheme();

  function getLoadingSize() {
    return parseFloat(theme.sizeIcons[size?.toLowerCase?.() || "MD"]);
  }

  return (
    <Container testID="loading-spinner-container" {...props}>
      {props.children || (
        <>
          <Loading
            testID="activity-indicator"
            size={getLoadingSize()}
            color={color ?? theme.colors.text.default}
          />
          {title && <Text>{title}</Text>}
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.container.default};
`;
const Text = styled.Text``;
const Loading = styled(ActivityIndicator)``;
