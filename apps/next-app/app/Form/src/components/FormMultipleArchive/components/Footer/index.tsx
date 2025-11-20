import { Button } from "@mobilestockweb/button";
import { Clickable } from "@mobilestockweb/clickable";
import { Container } from "@mobilestockweb/container";
import { Icon } from "@mobilestockweb/icons";
import { Typography } from "@mobilestockweb/typography";
import { useState } from "react";
import styled from "styled-components";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";
import { utils } from "../../utils";
export function Footer() {
  const MultipleArchive = useMultipleArchive();
  const [flipIcon, setFlipIcon] = useState(false);

  return (
    <>
      <Container.Horizontal align="END">
        {!!MultipleArchive.files?.length && (
          <Clickable onClick={() => setFlipIcon(!flipIcon)}>
            <Container.Horizontal align="CENTER">
              <Typography size="XS">
                {MultipleArchive.files?.length} arquivos
              </Typography>
              <ContainerFlip $flip={flipIcon}>
                <Icon name="ChevronDown" size="XS" />
              </ContainerFlip>
            </Container.Horizontal>
          </Clickable>
        )}
      </Container.Horizontal>
      <ContainerListHidden $flip={flipIcon}>
        {MultipleArchive.files?.map((item, index) => (
          <Container.Horizontal key={index} align="START_CENTER">
            <Container.Horizontal gap="SM" full>
              <Typography size="XS" weight="MEDIUM">
                {item.name.slice(0, 20)}
              </Typography>
              {item.size && (
                <Typography size="XS">
                  {utils.convertBytesToReadableFormat(item.size)}
                </Typography>
              )}
            </Container.Horizontal>
            <Container.Vertical>
              <Button
                variant="TRANSPARENT"
                icon="Trash"
                backgroundColor="CANCEL_DARK"
                size="XS"
                onClick={() =>
                  MultipleArchive.handleRemoveFile(`${item.name}-${item.size}`)
                }
              />
            </Container.Vertical>
          </Container.Horizontal>
        ))}
      </ContainerListHidden>
    </>
  );
}
const ContainerFlip = styled(Container.Horizontal)<{ $flip: boolean }>`
  transform: ${({ $flip }) => ($flip ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const ContainerListHidden = styled(Container.Vertical)<{ $flip: boolean }>`
  display: ${({ $flip }) => ($flip ? "flex" : "none")};
  max-height: 200px;
  overflow-y: auto;
`;
