import { useFileInput } from "@/app/File/hooks/useFile";
import { Button } from "@mobilestockweb/button";

export function HelpButton() {
  const FileInput = useFileInput();
  async function processFile(fileTarget: File) {
    return new Promise((resolve, reject) => {
      const mimeType = fileTarget.type;
      const reader = new FileReader();
      reader.onerror = () => {
        reject(
          new Error(
            `Failed to read the selected media because the operation failed.`,
          ),
        );
      };

      reader.onload = (result) => {
        console.log("100% loaded");
        resolve({
          uri: URL.createObjectURL(fileTarget),
          base64: result.target,
          mimeType,
          name: fileTarget.name,
          lastModified: fileTarget.lastModified,
          size: fileTarget.size,
          file: fileTarget,
        });
        return;
      };
      reader.onprogress = (progree) => {
        const percent = (progree.loaded / progree.total) * 100;
        console.log(`${fileTarget.name} Loading: ${percent.toFixed(2)}%`);
      };
      reader.readAsDataURL(fileTarget);
    });
  }
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
        let files = [];
        for (let i = 0; i < input.files.length; i++) {
          files.push(processFile(input.files[i]));
        }
        await Promise.all(files).then((processedFiles) => {
          console.log("processedFiles", processedFiles);
        });
      }
    });
    const event = new MouseEvent("click");
    input.dispatchEvent(event);
  }

  return (
    <Button text="Selecionar arquivo" size="XS" onClick={handleSelectFile} />
  );
}
