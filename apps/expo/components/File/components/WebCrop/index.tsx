import "react-image-crop/dist/ReactCrop.css";
import { Crop, ReactCrop } from "react-image-crop";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mobilestock-native/button";
import { Container } from "@mobilestock-native/container";
import { useFile } from "../../hooks/useFile";
import { FluidModal } from "../FluidModal";
import { ImagePickerAsset } from "expo-image-picker";
import { Dimensions } from "react-native";

type LoadedImageProps = {
  displayWidth: number;
  displayHeight: number;
  naturalWidth: number;
  naturalHeight: number;
};

export function CropDemo() {
  const FileInput = useFile();
  const REMOVEImageRef = useRef<HTMLImageElement>(null);
  const imageReference = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [loadedImage, setLoadedImage] = useState<LoadedImageProps>();

  useEffect(() => {
    if (!FileInput.imageToCrop) {
      setCrop(undefined);
      setLoadedImage(undefined);
      return;
    }
  }, [FileInput.imageToCrop, FileInput.openImageCropModal]);

  useEffect(() => {
    if (imageReference.current?.width) {
      loadCutArea({
        displayWidth: imageReference.current.width,
        displayHeight: imageReference.current.height,
        naturalWidth: imageReference.current.naturalWidth,
        naturalHeight: imageReference.current.naturalHeight,
      });
    }
  }, [imageReference.current?.width]);

  function loadCutArea({
    displayWidth,
    displayHeight,
    naturalWidth,
    naturalHeight,
  }: LoadedImageProps) {
    setLoadedImage({
      displayWidth,
      displayHeight,
      naturalWidth,
      naturalHeight,
    });

    const minimalSize = Math.min(displayWidth, displayHeight);

    setCrop({
      unit: "px",
      width: minimalSize,
      height: minimalSize,
      x: displayWidth > displayHeight ? (displayWidth - minimalSize) / 2 : 0,
      y: displayHeight > displayWidth ? (displayHeight - minimalSize) / 2 : 0,
    });
  }

  async function cutImage() {
    if (!FileInput.imageToCrop || !crop || !loadedImage) {
      return;
    }

    if (
      crop.width === undefined ||
      crop.height === undefined ||
      crop.x === undefined ||
      crop.y === undefined
    ) {
      return;
    }

    const scaleX = loadedImage.naturalWidth / loadedImage.displayWidth;
    const scaleY = loadedImage.naturalHeight / loadedImage.displayHeight;

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    const offscreenCanvas = new OffscreenCanvas(cropWidth, cropHeight);

    const drawingContext = offscreenCanvas.getContext("2d");
    if (!drawingContext) {
      return;
    }

    const originalImage = new Image();
    originalImage.src = FileInput.imageToCrop.uri;

    await new Promise<void>((resolve, reject) => {
      originalImage.onload = () => resolve();
      originalImage.onerror = () =>
        reject(new Error("Erro ao carregar a imagem original para corte."));
    });

    drawingContext.drawImage(
      originalImage,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight,
    );

    const generatedBlob = await offscreenCanvas.convertToBlob({
      type: "image/png",
      quality: 1,
    });

    const croppedImageUrl = URL.createObjectURL(generatedBlob);
    const croppedImageObject: ImagePickerAsset = {
      uri: croppedImageUrl,
      width: cropHeight,
      height: cropWidth,
      fileName: FileInput.imageToCrop.fileName,
      fileSize: generatedBlob.size,
      mimeType: generatedBlob.type,
      type: "image",
      file: new File(
        [generatedBlob],
        FileInput.imageToCrop.fileName ?? "cropped-image.png",
        {
          type: generatedBlob.type,
          lastModified: Date.now(),
        },
      ),
    };
    FileInput.handleImageCropSave(croppedImageObject);
  }

  function onLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const htmlImageElement = event.currentTarget;

    loadCutArea({
      displayWidth: htmlImageElement.width,
      displayHeight: htmlImageElement.height,
      naturalWidth: htmlImageElement.naturalWidth,
      naturalHeight: htmlImageElement.naturalHeight,
    });
  }

  return (
    <FluidModal visible={FileInput.openImageCropModal}>
      <Container.Vertical full>
        <Container.Vertical full align="CENTER">
          <Container.Vertical
            align="CENTER"
            style={
              FileInput.imageToCrop?.width < Dimensions.get("window").width
                ? {
                    width: Dimensions.get("window").width * 0.9,
                  }
                : undefined
            }
          >
            <ReactCrop
              crop={crop}
              onChange={(changedCrop) => setCrop(changedCrop)}
              style={
                FileInput.imageToCrop?.width < Dimensions.get("window").width
                  ? {
                      width: "100%",
                      height: "100%",
                      maxWidth: "80%",
                    }
                  : undefined
              }
            >
              <img
                src={FileInput.imageToCrop?.uri}
                ref={imageReference}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
                onLoad={onLoad}
              />
            </ReactCrop>
          </Container.Vertical>
        </Container.Vertical>
      </Container.Vertical>

      <img ref={REMOVEImageRef} alt="Teste" />

      <Container.Horizontal gap="MD">
        <Container.Vertical full>
          <Button
            onPress={FileInput.handleImageCropCancel}
            text="Cancelar"
            backgroundColor="CANCEL_DARK"
          />
        </Container.Vertical>
        <Container.Vertical full>
          <Button onPress={cutImage} text="Salvar" />
        </Container.Vertical>
      </Container.Horizontal>
    </FluidModal>
  );
}
