import { styled } from "styled-components";

import { Button } from "@mobilestockweb/button";
import { Clickable } from "@mobilestockweb/clickable";
import { Container } from "@mobilestockweb/container";
import { Img } from "@mobilestockweb/image";
import { Typography } from "@mobilestockweb/typography";

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
    <>
      <BackgroundContainer>
        <Container.Main>
          <Container.Horizontal align="BETWEEN_CENTER" padding="XS">
            <Container.Vertical align="CENTER">
              {backNavigation ? (
                <Button
                  variant="DEFAULT"
                  icon="ArrowLeft"
                  circular
                  size="SM"
                  onClick={backNavigation}
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
              <Clickable onClick={handleCenterClick}>
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
                    <Clickable onClick={handleAvatarClick}>
                      <Img
                        alt="Avatar"
                        src={context.avatar}
                        size="XS"
                        borderRadius="ROUNDED"
                      />
                    </Clickable>
                  </>
                ) : (
                  <Button icon="Settings" onClick={handleAvatarClick} />
                )}
              </>
            )}
          </Container.Horizontal>
        </Container.Main>
      </BackgroundContainer>
      {context?.subHeader && (
        <BackGroundSubHeader>
          <Container.Horizontal align="BETWEEN_CENTER">
            {context?.subHeader}
          </Container.Horizontal>
        </BackGroundSubHeader>
      )}
    </>
  );
}

const BackgroundContainer = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: ${({ theme }) => theme.colors.header.background};
`;

const BackGroundSubHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.header.sub};
  border-radius: 0 0 0.4rem 0.4rem;
`;
