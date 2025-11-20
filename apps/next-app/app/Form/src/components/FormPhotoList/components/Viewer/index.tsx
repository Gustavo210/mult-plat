"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
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
import { useId, useState } from "react";
import { usePhotoList } from "../../hooks/usePhotoList";
import { AddButton } from "../AddButton";
import { ImageCardControl } from "../ImageCardControl";

export function Viewer({
  numberOfImagesVisible = 0,
  buttonAddDirection = "left",
}) {
  const FileInput = usePhotoList();
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
    FileInput.images?.findIndex((item) => `${item.name}-${item.size}` === id) ||
    0;
  const activeIndex = activeId ? getIndex(activeId) : -1;

  function handleDragEnd({ over }: DragEndEvent) {
    setActiveId(null);
    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        const newOrdem = arrayMove(
          FileInput.images as File[],
          activeIndex,
          overIndex
        );
        FileInput.reorderImages(newOrdem);
      }
    }
  }

  return (
    <DndContext
      id={dragAndDropContextIdentifier}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragCancel={() => {
        setActiveId(null);
      }}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }
        setActiveId(active.id);
      }}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <Container.Horizontal align="START_CENTER" gap="2XS">
        {buttonAddDirection === "left" && <AddButton />}
        <SortableContext
          items={
            FileInput.images?.map((item) => `${item.name}-${item.size}`) || []
          }
          strategy={horizontalListSortingStrategy}
        >
          <div
            style={{
              display: "flex",
              flexBasis: "max-content",
              gap: "8px",
              overflowX: "scroll",
              padding: "8px",
            }}
          >
            {FileInput.images?.map((item) => (
              <ImageCardControl key={`${item.name}-${item.size}`} file={item} />
            ))}
          </div>
        </SortableContext>
        {buttonAddDirection === "right" && <AddButton />}
      </Container.Horizontal>
    </DndContext>
  );
}
