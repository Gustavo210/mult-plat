import { Button } from "@mobilestockweb/button";
import { Clickable } from "@mobilestockweb/clickable";
import { Container } from "@mobilestockweb/container";
import { Icon } from "@mobilestockweb/icons";
import { Typography } from "@mobilestockweb/typography";
import { useFileInput } from "../../../../hooks/useFile";

export function Footer() {
  const FileInput = useFileInput();

  function converterBytesParaFormatoLegivel(quantidadeBytes: number): string {
    const quantidadeKilobytes = 1024;
    const quantidadeMegabytes = 1024 * 1024;
    const quantidadeGigabytes = 1024 * 1024 * 1024;

    if (quantidadeBytes >= quantidadeGigabytes) {
      const valorGigabytes = quantidadeBytes / quantidadeGigabytes;
      return valorGigabytes.toFixed(2) + " GB";
    }

    if (quantidadeBytes >= quantidadeMegabytes) {
      const valorMegabytes = quantidadeBytes / quantidadeMegabytes;
      return valorMegabytes.toFixed(2) + " MB";
    }

    if (quantidadeBytes >= quantidadeKilobytes) {
      const valorKilobytes = quantidadeBytes / quantidadeKilobytes;
      return valorKilobytes.toFixed(2) + " KB";
    }

    return quantidadeBytes + " B";
  }

  return (
    <>
      <Container.Horizontal align="END">
        {!!FileInput.files?.length && (
          <Clickable>
            <Container.Horizontal align="CENTER">
              <Typography size="XS">
                {FileInput.files?.length} arquivos
              </Typography>
              <>
                <Icon name="ChevronDown" size="XS" />
              </>
            </Container.Horizontal>
          </Clickable>
        )}
      </Container.Horizontal>
      {FileInput.files?.map((item, index) => (
        <Container.Horizontal key={index} align="START_CENTER">
          <Container.Horizontal gap="SM" full>
            <Typography size="XS" weight="MEDIUM">
              {item.name.slice(0, 20)}
            </Typography>
            {item.size && (
              <Typography size="XS">
                {converterBytesParaFormatoLegivel(item.size)}
              </Typography>
            )}
          </Container.Horizontal>
          <Button
            variant="TRANSPARENT"
            icon="Trash"
            backgroundColor="CANCEL_DARK"
            size="XS"
            onClick={() =>
              FileInput.handleRemoveFile(`${item.name}-${item.size}`)
            }
          />
        </Container.Horizontal>
      ))}
    </>
  );
}
