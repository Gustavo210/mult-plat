import { Button } from "@mobilestockweb/button";
import { Container } from "@mobilestockweb/container";
import { useEffect, useMemo, useRef, useState } from "react";
import { Crop, ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { usePhotoList } from "../../hooks/usePhotoList";
import { FluidModal } from "./components/FluidModal";

type LoadedImageProps = {
  displayWidth: number;
  displayHeight: number;
  naturalWidth: number;
  naturalHeight: number;
};

type DisplaySizeProps = {
  width: number;
  height: number;
};

export function CropDemo() {
  const FileInput = usePhotoList();
  const imageReference = useRef<HTMLImageElement>(null);
  const imageWrapperReference = useRef<HTMLDivElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [loadedImage, setLoadedImage] = useState<LoadedImageProps>();
  const [displaySize, setDisplaySize] = useState<DisplaySizeProps>();

  useEffect(() => {
    if (!FileInput.imageToCrop) {
      setCrop(undefined);
      setLoadedImage(undefined);
      setDisplaySize(undefined);
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
    originalImage.src = URL.createObjectURL(FileInput.imageToCrop);

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
      cropHeight
    );

    const generatedBlob = await offscreenCanvas.convertToBlob({
      type: "image/png",
      quality: 1,
    });

    FileInput.handleImageCropSave(
      new File(
        [generatedBlob],
        FileInput.imageToCrop.name ?? "cropped-image.png",
        {
          type: generatedBlob.type,
          lastModified: Date.now(),
        }
      )
    );
  }

  function onLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const htmlImageElement = event.currentTarget;
    const wrapperElement = imageWrapperReference.current;

    if (!wrapperElement) {
      return;
    }

    const availableWidth = wrapperElement.clientWidth;
    const availableHeight = wrapperElement.clientHeight;

    const naturalWidth = htmlImageElement.naturalWidth;
    const naturalHeight = htmlImageElement.naturalHeight;

    if (
      !availableWidth ||
      !availableHeight ||
      !naturalWidth ||
      !naturalHeight
    ) {
      return;
    }

    const scale = Math.min(
      availableWidth / naturalWidth,
      availableHeight / naturalHeight
    );

    const displayWidth = naturalWidth * scale;
    const displayHeight = naturalHeight * scale;

    setDisplaySize({
      width: displayWidth,
      height: displayHeight,
    });

    loadCutArea({
      displayWidth,
      displayHeight,
      naturalWidth,
      naturalHeight,
    });
  }

  const uri = useMemo(
    () =>
      FileInput.imageToCrop
        ? URL.createObjectURL(FileInput.imageToCrop)
        : undefined,
    [FileInput.imageToCrop]
  );

  return (
    <FluidModal isOpen={FileInput.openImageCropModal}>
      <Container.Vertical
        full
        padding="NONE_XS_XS_XS"
        style={{
          height: "100%",
          maxHeight: "100%",
          boxSizing: "border-box",
        }}
        gap="MD"
      >
        <Container.Vertical
          full
          align="CENTER"
          style={{
            minHeight: 0,
          }}
        >
          <Container.Vertical
            ref={imageWrapperReference as unknown as React.Ref<HTMLDivElement>}
            align="CENTER"
            style={{
              width: "100%",
              maxWidth: "100%",
              minHeight: 0,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={(changedCrop) => setCrop(changedCrop)}
              style={
                displaySize
                  ? {
                      width: displaySize.width,
                      height: displaySize.height,
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }
                  : {
                      width: "100%",
                      height: "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }
              }
            >
              <img
                src={uri}
                ref={imageReference}
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                onLoad={onLoad}
              />
            </ReactCrop>
          </Container.Vertical>
        </Container.Vertical>

        <Container.Horizontal gap="MD">
          <Container.Vertical full>
            <Button
              onClick={FileInput.handleImageCropCancel}
              text="Cancelar"
              backgroundColor="CANCEL_DARK"
            />
          </Container.Vertical>
          <Container.Vertical full>
            <Button onClick={cutImage} text="Salvar" />
          </Container.Vertical>
        </Container.Horizontal>
      </Container.Vertical>
    </FluidModal>
  );
}
