import { useFileInput } from "@/app/File/hooks/useFile";
import { Button } from "@mobilestockweb/button";

export function HelpButton() {
  const FileInput = useFileInput();

  async function handleSelectFile() {
    const input = document.createElement("input");
    input.style.display = "none";
    input.setAttribute("type", "file");
    input.setAttribute("accept", "*/*");
    input.setAttribute("id", String(Math.random()));
    if (FileInput.multiple) {
      input.setAttribute("multiple", "multiple");
    }
    document.body.appendChild(input);
    input.addEventListener("change", async () => {
      if (input.files) {
        FileInput.handleSaveFiles(input.files);
      }
    });
    const event = new MouseEvent("click");
    input.dispatchEvent(event);
  }

  return (
    <Button text="Selecionar arquivo" size="XS" onClick={handleSelectFile} />
  );
}
