import { Button } from "@mobilestockweb/button";
import { Clickable } from "@mobilestockweb/clickable";
import { Container } from "@mobilestockweb/container";
import { Icon } from "@mobilestockweb/icons";
import { Typography } from "@mobilestockweb/typography";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";
import { utils } from "../../utils";
export function Footer() {
  const MultipleArchive = useMultipleArchive();

  return (
    <>
      <Container.Horizontal align="END">
        {!!MultipleArchive.files?.length && (
          <Clickable>
            <Container.Horizontal align="CENTER">
              <Typography size="XS">
                {MultipleArchive.files?.length} arquivos
              </Typography>
              <>
                <Icon name="ChevronDown" size="XS" />
              </>
            </Container.Horizontal>
          </Clickable>
        )}
      </Container.Horizontal>
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
          <Button
            variant="TRANSPARENT"
            icon="Trash"
            backgroundColor="CANCEL_DARK"
            size="XS"
            onClick={() =>
              MultipleArchive.handleRemoveFile(`${item.name}-${item.size}`)
            }
          />
        </Container.Horizontal>
      ))}
    </>
  );
}
