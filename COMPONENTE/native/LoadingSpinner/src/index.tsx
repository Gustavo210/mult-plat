import { ActivityIndicator, ColorValue, ViewProps } from "react-native";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

import { IconSize } from "../../Icons";

export interface LoadingSpinnerProps extends ViewProps {
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
    const sizeFormated: keyof DefaultTheme["sizeIcons"] =
      size?.toLowerCase?.() as keyof DefaultTheme["sizeIcons"];
    console.log("teste", theme.sizeIcons[sizeFormated || "md"]);
    return parseFloat(theme.sizeIcons[sizeFormated || "md"]);
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
