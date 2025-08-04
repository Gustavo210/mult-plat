import { styled } from "styled-components/native";

import { Button } from "@mobilestock-native/button";
import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { Img } from "@mobilestock-native/image";
import { Typography } from "@mobilestock-native/typography";

import { useCallback } from "react";
import { useHeader } from "../../hooks/useHeader";

interface HeaderProps {
  pageTitle?: string;
  pressOnTitle?: () => void;
  backNavigation?: () => void;
  disableAvatar?: boolean;
}

export function Header({
  pageTitle,
  pressOnTitle,
  backNavigation,
  disableAvatar = false,
}: HeaderProps) {
  const context = useHeader();

  const handleCenterClick = useCallback(() => {
    !!pressOnTitle ? pressOnTitle?.() : context.pressOnTitle?.();
  }, [pressOnTitle, context]);

  const handleAvatarClick = useCallback(() => {
    context.pressOnAvatar?.();
  }, [context]);

  return (
    <BaseContainer>
      <BackgroundContainer>
        <Container.Horizontal align="BETWEEN_CENTER" padding="XS">
          <Container.Vertical align="CENTER">
            {backNavigation ? (
              <Button
                variant="DEFAULT"
                icon="ArrowLeft"
                circular
                size="SM"
                onPress={backNavigation}
              />
            ) : (
              <Img
                src={context.logoComponent}
                alt="Logo"
                size="XS"
                borderRadius="ROUNDED"
              />
            )}
          </Container.Vertical>

          <Container.Vertical full align="CENTER">
            <Clickable onPress={handleCenterClick}>
              <Typography size="LG" weight="BOLD" color="CONTRAST">
                {context.appName}
              </Typography>
            </Clickable>
            {pageTitle && (
              <Typography size="SM" color="CONTRAST_600">
                {pageTitle}
              </Typography>
            )}
          </Container.Vertical>

          {!disableAvatar && (
            <>
              {context.avatar ? (
                <>
                  <Clickable onPress={handleAvatarClick}>
                    <Img
                      alt="Avatar"
                      src={context.avatar}
                      size="XS"
                      borderRadius="ROUNDED"
                    />
                  </Clickable>
                </>
              ) : (
                <Button icon="Settings" onPress={handleAvatarClick} />
              )}
            </>
          )}
        </Container.Horizontal>
      </BackgroundContainer>
      <BackGroundSubHeader>
        <Container.Horizontal align="BETWEEN_CENTER">
          {context?.subHeader}
        </Container.Horizontal>
      </BackGroundSubHeader>
    </BaseContainer>
  );
}

const BackgroundContainer = styled.View`
  padding-top: 40px;
  margin: 0 -4px;
  background-color: ${({ theme }) => theme.colors.header.background};
`;

const BackGroundSubHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.header.sub};
  border-radius: 0 0 5px 5px;
`;

const BaseContainer = styled.View`
  margin-top: -40px;
`;
