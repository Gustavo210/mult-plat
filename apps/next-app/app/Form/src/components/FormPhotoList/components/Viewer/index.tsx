"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Container } from "@mobilestockweb/container";
import { useId, useMemo, useState } from "react";
import { utils } from "../../../../utils";
import { usePhotoList } from "../../hooks/usePhotoList";
import { AddButton } from "../AddButton";
import { ErrorLabel } from "../ErrorLabel";
import { ImageCardControl } from "../ImageCardControl";
import { Label } from "../Label";

interface ImageViewerProps {
  numberOfImagesVisible?: number;
  buttonAddDirection?: "left" | "right";
  label?: string;
  alignLabel?: "END" | "CENTER" | "START";
}

export function Viewer({
  numberOfImagesVisible = 4,
  buttonAddDirection = "left",
  label,
  alignLabel,
}: ImageViewerProps) {
  const PhotoList = usePhotoList();
  const dragAndDropContextIdentifier = useId();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getIndex = (id: UniqueIdentifier) =>
    PhotoList.images?.findIndex((item) => utils.getHashFile(item) === id) || 0;
  const activeIndex = activeId ? getIndex(activeId) : -1;

  function handleDragEnd({ over }: DragEndEvent) {
    setActiveId(null);
    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        const newOrdem = arrayMove(
          PhotoList.images as File[],
          activeIndex,
          overIndex
        );
        PhotoList.reorderImages(newOrdem);
      }
    }
  }

  function handleDragStart({ active }: DragStartEvent) {
    if (!active) {
      return;
    }
    setActiveId(active.id);
  }

  const maxWidth = useMemo(() => {
    if (!!numberOfImagesVisible) {
      return `calc(${PhotoList.sizeComponent} * ${numberOfImagesVisible} + (${PhotoList.gapComponent} * ${numberOfImagesVisible}))`;
    }

    return `calc(100% - ${PhotoList.sizeComponent} - ${PhotoList.gapComponent})`;
  }, [numberOfImagesVisible, PhotoList.sizeComponent, PhotoList.gapComponent]);

  return (
    <>
      {!!label && (
        <Container.Horizontal align={alignLabel || "START"}>
          <Label>{label}</Label>
        </Container.Horizontal>
      )}
      <DndContext
        id={dragAndDropContextIdentifier}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragCancel={() => setActiveId(null)}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <Container.Horizontal align="START_CENTER" gap="2XS">
          {buttonAddDirection === "left" && <AddButton />}
          <SortableContext
            items={
              PhotoList.images?.map((item) => utils.getHashFile(item)) || []
            }
            strategy={horizontalListSortingStrategy}
          >
            <div
              style={{
                display: "flex",
                flexBasis: "max-content",
                overflowX: "scroll",
                gap: PhotoList.gapComponent,
                maxWidth,
              }}
            >
              {PhotoList.images?.map((item) => (
                <ImageCardControl key={utils.getHashFile(item)} file={item} />
              ))}
            </div>
          </SortableContext>
          {buttonAddDirection === "right" && <AddButton />}
        </Container.Horizontal>
      </DndContext>
      <ErrorLabel />
    </>
  );
}
