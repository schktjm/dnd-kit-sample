import { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type DragCancelEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { DndItem } from "../types/item";
import { AccessibleSortableList } from "./AccessibleSortableList";

interface AccessibleDndListProps {
  initialItems: DndItem[];
}

export function AccessibleDndList({ initialItems }: AccessibleDndListProps) {
  const [items, setItems] = useState<DndItem[]>(initialItems);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleMoveUp(id: string) {
    setItems((items) => {
      const index = items.findIndex((item) => item.id === id);
      if (index > 0) {
        return arrayMove(items, index, index - 1);
      }
      return items;
    });
  }

  function handleMoveDown(id: string) {
    setItems((items) => {
      const index = items.findIndex((item) => item.id === id);
      if (index < items.length - 1) {
        return arrayMove(items, index, index + 1);
      }
      return items;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      accessibility={{
        screenReaderInstructions: {
          draggable: `ドラッグ可能なアイテムを持ち上げるには、スペースキーを押してください。ドラッグ中は、矢印キーでアイテムを移動できます。新しい位置にドロップするには再度スペースキーを押し、キャンセルするにはエスケープキーを押してください。`,
        },
        announcements: {
          onDragStart({ active }: DragStartEvent) {
            return `アイテム ${active.id} を持ち上げました`;
          },
          onDragOver({ active, over }: DragOverEvent) {
            if (over) {
              return `アイテム ${active.id} が ${over.id} の位置に移動しました`;
            }
            return `アイテム ${active.id} がリスト外に移動しました`;
          },
          onDragEnd({ active, over }: DragEndEvent) {
            if (over && active.id !== over.id) {
              return `アイテム ${active.id} を ${over.id} の位置に置きました`;
            }
            return `アイテム ${active.id} を置きました`;
          },
          onDragCancel({ active }: DragCancelEvent) {
            return `ドラッグがキャンセルされました。アイテム ${active.id} を元の位置に戻しました`;
          },
        },
      }}
    >
      <AccessibleSortableList
        items={items}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
    </DndContext>
  );
}
