import { useFileInput } from "@/app/File/hooks/useFile";
import { Button } from "@mobilestockweb/button";
import { Container } from "@mobilestockweb/container";
import { useTheme } from "styled-components";

export function ImageAdd() {
  const FileInput = useFileInput();
  const Theme = useTheme();

  function handleClick() {
    const input = document.createElement("input");
    input.style.display = "none";
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("id", String(Math.random()));
    // if (FileInput.multiple) {
    // }
    input.setAttribute("multiple", "multiple");
    document.body.appendChild(input);
    input.addEventListener("change", async () => {
      if (input.files) {
        FileInput.handleSaveImages(input.files);
      }
      document.body.removeChild(input);
    });
    const event = new MouseEvent("click");
    input.dispatchEvent(event);
  }
  return (
    <Container.Vertical>
      <Button
        icon="Plus"
        variant="OUTLINE"
        onClick={handleClick}
        style={{
          height: Theme.sizeImage.sm,
          width: Theme.sizeImage.sm,
          minWidth: Theme.sizeImage.sm,
          minHeight: Theme.sizeImage.sm,
        }}
      />
    </Container.Vertical>
  );
}
