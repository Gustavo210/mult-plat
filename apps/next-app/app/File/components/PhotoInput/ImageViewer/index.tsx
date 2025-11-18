"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useId, useState } from "react";
import {
  restrictToFirstScrollableAncestor,
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItem } from "../SortableItem";

const LIST = [
  {
    id: "draggable-1",
    content: "Item 1",
  },
  {
    id: "draggable-2",
    content: "Item 2",
  },
  {
    id: "draggable-3",
    content: "Item 3",
  },
  {
    id: "draggable-4",
    content: "Item 4",
  },
  {
    id: "draggable-5",
    content: "Item 5",
  },
  {
    id: "draggable-6",
    content: "Item 6",
  },
  {
    id: "draggable-7",
    content: "Item 7",
  },
  {
    id: "draggable-8",
    content: "Item 8",
  },
  {
    id: "draggable-9",
    content: "Item 9",
  },
  {
    id: "draggable-10",
    content: "Item 10",
  },
];

export function ImageViewer() {
  const dragAndDropContextIdentifier = useId();
  const [items, setItems] = useState(LIST);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  function handleDragEnd({ over }: DragEndEvent) {
    setActiveId(null);
    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        setItems((items) => {
          return arrayMove(items, activeIndex, overIndex);
        });
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
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "scroll",
          padding: "8px",
        }}
      >
        <SortableContext items={LIST} strategy={horizontalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id.id} id={id.id} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
